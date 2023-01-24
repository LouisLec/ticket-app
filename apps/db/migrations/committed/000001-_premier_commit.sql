--! Previous: -
--! Hash: sha1:adb7264f5b8d467be3a31f8c8e1e54edb66a227d
--! Message: 🚀_premier_commit

--! split: 00001.sql
drop schema if exists publ cascade;
drop schema if exists priv cascade;

/*
 * The `public` *schema* contains things like PostgreSQL extensions. We
 * deliberately do not install application logic into the public schema
 * (instead storing it to publ/priv as appropriate),
 * but none the less we don't want untrusted roles to be able to install or
 * modify things into the public schema.
 *
 * The `public` *role* is automatically inherited by all other roles; we only
 * want specific roles to be able to access our database so we must revoke
 * access to the `public` role.
 */
revoke all on schema public from public;

alter default privileges revoke all on sequences from public;
alter default privileges revoke all on functions from public;

-- Of course we want our database owner to be able to do anything inside the
-- database, so we grant access to the `public` schema:
grant all on schema public to :DATABASE_OWNER;


/*
 * Read about our publ/priv schemas here:
 * https://www.graphile.org/postgraphile/namespaces/#advice
 *
 * Note this pattern is not required to use PostGraphile, it's merely the
 * preference of the author of this package.
 */
create schema publ;
create schema priv;

-- The 'visitor' role (used by PostGraphile to represent an end user) may
-- access the public, and publ schemas (but _NOT_ the
-- priv schema).
grant usage on schema public, publ to :DATABASE_VISITOR;

-- We want the `visitor` role to be able to insert rows (`serial` data type
-- creates sequences, so we need to grant access to that).
alter default privileges in schema public, publ
  grant usage, select on sequences to :DATABASE_VISITOR;

-- And the `visitor` role should be able to call functions too.
alter default privileges in schema public, publ
  grant execute on functions to :DATABASE_VISITOR;

--! split: 00010-common_triggers.sql
/*
 * These triggers are commonly used across many tables.
 */

 /*
 * This trigger is used on tables with created_at and updated_at to ensure that
 * these timestamps are kept valid (namely: `created_at` cannot be changed, and
 * `updated_at` must be monotonically increasing).
 */
create function priv.tg__timestamps() returns trigger as $$
begin
  NEW.created_at = (case when TG_OP = 'INSERT' then NOW() else OLD.created_at end);
  NEW.updated_at = (case when TG_OP = 'UPDATE' and OLD.updated_at >= NOW() then OLD.updated_at + interval '1 millisecond' else NOW() end);
  return NEW;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;
comment on function priv.tg__timestamps() is
  E'This trigger should be called on all tables with created_at, updated_at - it ensures that they cannot be manipulated and that updated_at will always be larger than the previous updated_at.';

-- Used for queueing jobs easily; relies on the fact that every table we have
-- has a primary key 'id' column; this won't work if you rename your primary
-- key columns.
create function priv.tg__add_job() returns trigger as $$
begin
  perform graphile_worker.add_job(tg_argv[0], json_build_object('id', NEW.id));
  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;
comment on function priv.tg__add_job() is
  E'Useful shortcut to create a job on insert/update. Pass the task name as the first trigger argument, and optionally the queue name as the second argument. The record id will automatically be available on the JSON payload.';


CREATE OR REPLACE FUNCTION public.to_slug(text)
RETURNS text AS $$
DECLARE
  slug text;
BEGIN
  slug := translate(lower($1), ' ', '-');
  slug := translate(slug, '.', '-');
  slug := translate(slug, '_', '-');
  slug := translate(slug, '/', '-');
  slug := translate(slug, '&', 'and');
  slug := translate(slug, '''', '');
  slug := translate(slug, '"', '');
  RETURN slug;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION publ.generate_slug() RETURNS TRIGGER AS $$
BEGIN
  NEW.slug := to_slug(NEW.name);

  -- Check if the slug already exists in the table
  -- If it does, add a random 4 digit suffix
  -- and check again until a unique slug is found
  WHILE EXISTS (SELECT 1 FROM publ.organizations WHERE slug = NEW.slug) LOOP
    NEW.slug := NEW.slug || ('-' || (random() * 10000)::integer)::text;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--! split: 00200-users.sql
/*
  TABLE: publ.users
  DESCRIPTION: Users of the app
*/
drop table if exists publ.users cascade;
create table publ.users (
    id uuid not null default uuid_generate_v4() primary key unique, 
    firstname text not null,
    lastname text not null,
    avatar_url text,
    is_admin boolean not null default false,
    email citext unique not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.users(created_at);
  create index on publ.users(updated_at);
  create index on publ.users(email);

-- RBAC
  grant select on publ.users to :DATABASE_VISITOR;
  grant update (firstname, avatar_url,  lastname, email) on publ.users to :DATABASE_VISITOR;
  grant delete on publ.users to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.users
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.users enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.users
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.users
*/


/*
  TABLE: priv.user_secrets
  DESCRIPTION: Les infos confidentielles de l'utilisateur
*/
drop table if exists priv.user_secrets cascade;
create table priv.user_secrets (
  user_id uuid not null primary key references publ.users on delete cascade,
  password_hash text,
  last_login_at timestamptz not null default now(),
  failed_password_attempts int not null default 0,
  first_failed_password_attempt timestamptz,
  reset_password_token text,
  reset_password_token_generated timestamptz,
  failed_reset_password_attempts int not null default 0,
  first_failed_reset_password_attempt timestamptz,
  delete_account_token text,
  delete_account_token_generated timestamptz
);

-- indexes


-- RBAC
  grant select on priv.user_secrets to :DATABASE_VISITOR;

-- triggers

-- RLS
  alter table priv.user_secrets enable row level security;

-- fixtures
  -- fixtures go here
/*
  END TABLE: priv.user_secrets
*/



/*
 * When we insert into `users` we _always_ want there to be a matching
 * `user_secrets` entry, so we have a trigger to enforce this:
 */
create function priv.tg_user_secrets__insert_with_user() returns trigger as $$
begin
  insert into priv.user_secrets(user_id) values(NEW.id) on conflict do nothing;
  return NEW;
end;

$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;
create trigger _500_insert_secrets
  after insert on publ.users
  for each row
  execute procedure priv.tg_user_secrets__insert_with_user();
comment on function priv.tg_user_secrets__insert_with_user() is
  E'Ensures that every user record has an associated user_secret record.';

--! split: 00210-auth.sql
drop type if exists publ.jwt;
create type publ.jwt as (
    sub uuid,
    exp bigint
);


 drop function if exists publ.current_user_id cascade;
create function publ.current_user_id() returns uuid as $$
    select nullif(current_setting('jwt.claims.sub', true), '')::uuid;
$$ language sql stable;
comment on function publ.current_user_id() is
  E'Handy method to get the current user ID.';
  grant execute on function publ.current_user_id to :DATABASE_VISITOR;

  create function publ.current_user() returns publ.users as $$
  select users.* from publ.users where id = publ.current_user_id();
$$ language sql stable;
comment on function publ.current_user() is
  E'The currently logged in user (or null if not logged in).';


drop function if exists publ.register cascade;
create function publ.register(
    email citext, 
    firstname text,
    lastname text,
    password text,
    avatar_url text default null
) returns publ.jwt as $$
declare
    v_user_id uuid;
begin
    insert into publ.users (email, firstname, lastname, avatar_url) values (email, firstname, lastname, avatar_url) returning id into v_user_id;
    insert into priv.user_secrets as us (user_id, password_hash) values (v_user_id, crypt(password, gen_salt('bf')))
    on conflict (user_id) do update set password_hash = excluded.password_hash;
    return (v_user_id, extract(epoch from (now() + interval '2 days')))::publ.jwt;

end;
$$ language plpgsql volatile security definer;
grant execute on function publ.register to :DATABASE_VISITOR;

drop function if exists publ.login cascade;
create function publ.login(email citext, password text) returns publ.jwt as $$  
declare
    user_id uuid;
    password_hash text;
begin
    select id, password_hash into user_id, password_hash from publ.users join priv.user_secrets on users.id = user_secrets.user_id where email = email;
    if crypt(password, password_hash) = password_hash then
        return (user_id, extract(epoch from (now() + interval '20 days')))::publ.jwt;
    else
        raise exception 'invalid password';
    end if;
end;
$$ language plpgsql volatile security definer;
grant execute on function publ.login to :DATABASE_VISITOR;



/*
 * Because you can register with username/password or using OAuth (social
 * login), we need a way to tell the user whether or not they have a
 * password. This is to help the UI display the right interface: change
 * password or set password.
 */
create function publ.users_has_password(u publ.users) returns boolean as $$
  select (password_hash is not null) from priv.user_secrets where user_secrets.user_id = u.id and u.id = publ.current_user_id();
$$ language sql stable security definer set search_path to pg_catalog, public, pg_temp;

--! split: 00500-organisations.sql
/*
  TABLE: publ.organizations
  DESCRIPTION: An organisation is a group of people who work together on projects.
*/
drop table if exists publ.organizations cascade;
create table publ.organizations (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text unique not null,
    slug text unique not null,
    description text not null,
    logo_url text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.organizations(created_at);
  create index on publ.organizations(updated_at);
  create index on publ.organizations(name);
  create index on publ.organizations(slug);

-- RBAC
  grant select on publ.organizations to :DATABASE_VISITOR;
    grant insert(name, description, logo_url) on publ.organizations to :DATABASE_VISITOR;
    grant update(name, description, logo_url) on publ.organizations to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.organizations
  for each row
  execute procedure priv.tg__timestamps();
  


CREATE TRIGGER generate_slug_trigger
BEFORE INSERT OR UPDATE ON publ.organizations
FOR EACH ROW
EXECUTE FUNCTION publ.generate_slug();

-- RLS
  alter table publ.organizations enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.organizations
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
  insert into publ.organizations (id, name, description, logo_url) values ('3fdd6e49-8a4b-41c8-8df0-17fe8be4efb8', 'The Organisation', 'The Organisation is a group of people who work together on projects.', 'https://project-management.com/wp-content/uploads/2022/11/PMcom_logo_MobileLogo.png');
/*
  END TABLE: publ.organizations
*/

--! split: 550-users_organiwations.sql
drop table if exists publ.organization_memberships_roles_enum cascade;
create table publ.organization_memberships_roles_enum (
    type text primary key,
    description text
);
comment on table publ.organization_memberships_roles_enum is E'@enum';

insert into publ.organization_memberships_roles_enum values
    ('OWNER', 'Owner of the organization'),
    ('ADMIN', 'Admin of the organization'),
    ('DEVELOPER', 'Member of the organization'),
    ('MANAGER', 'Manager of the organization'),
    ('CLIENT', 'Client of the organization'),
    ('GUEST', 'Guest of the organization');


/*
  TABLE: publ.organization_memberships
  DESCRIPTION: Appartenance des utilisateurs aux organisations
*/
drop table if exists publ.organization_memberships cascade;
create table publ.organization_memberships (
    id uuid not null default uuid_generate_v4() primary key unique, 
    organization_id uuid not null references publ.organizations(id) on delete cascade,
    user_id uuid not null references publ.users(id) on delete cascade,
    role text not null default 'GUEST' references publ.organization_memberships_roles_enum(type) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (organization_id, user_id)
);

-- indexes
  create index on publ.organization_memberships(created_at);
  create index on publ.organization_memberships(updated_at);
    create index on publ.organization_memberships(organization_id);
    create index on publ.organization_memberships(user_id);
    create index on publ.organization_memberships(role);

-- RBAC
  grant select on publ.organization_memberships to :DATABASE_VISITOR;
  grant insert (organization_id, user_id, role) on publ.organization_memberships to :DATABASE_VISITOR;
    grant update ( role) on publ.organization_memberships to :DATABASE_VISITOR;
    grant delete on publ.organization_memberships to :DATABASE_VISITOR;


-- triggers
  create trigger _100_timestamps
  before insert or update on publ.organization_memberships
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.organization_memberships enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.organization_memberships
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.organization_memberships
*/

--! split: 01000-projects.sql
/*
    TABLE: publ.projectsprojects
    DESCRIPTION:  A project is a group of epics that are related to each other. The project as a whole is a goal that the organization is trying to achieve.
*/
drop table if exists publ.projects cascade;
create table publ.projects (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text not null,
    slug text not null,
    description text not null,
    organization_id uuid not null references publ.organizations(id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint projects_organization_id_name_key unique (organization_id, name),
    constraint projects_organization_id_slug_key unique (organization_id, slug)
);

-- indexes
    create index on publ.projects(organization_id);
    create index on publ.projects(created_at);
    create index on publ.projects(updated_at);
    create index on publ.projects(name);
    create index on publ.projects(slug);

-- RBAC
    grant select on publ.projects to :DATABASE_VISITOR;
    grant insert(name, description, organization_id) on publ.projects to :DATABASE_VISITOR;
    grant update(name, description) on publ.projects to :DATABASE_VISITOR;

-- triggers
    create trigger _100_timestamps
    before insert or update on publ.projects
    for each row
    execute procedure priv.tg__timestamps();

    create trigger _700_generate_slug_trigger
    before insert or update on publ.projects
    for each row
    execute procedure publ.generate_slug();


-- RLS
    alter table publ.projects enable row level security;

    create policy no_limit /*TODO: update policy*/
    on publ.projects
    for all
    using (true)
    with check(true);

-- fixtures
    -- fixtures go here
      insert into publ.projects (id, name, description, organization_id) values ('b9b4b51f-e5e1-4068-a593-4c7212da4e2d', 'Chez Daddy', 'Des cafés conviviaux et intergénrationnels pour recréer du lien dans les quartiers', (select id from publ.organizations where name = 'The Organisation'));
    insert into publ.projects (id, name, description, organization_id) values ('2678d40b-c0ee-4472-b9b1-146374a87fa4', 'Canto', 'Le conservatoire du chant populaire', (select id from publ.organizations where name = 'The Organisation'));
    insert into publ.projects (id, name, description, organization_id) values ('a04700b6-8afc-4ce5-a820-599b6cef5de1', 'Napol.io', 'Le meilleur booster de productivité pour la gestion de projet informatique', (select id from publ.organizations where name = 'The Organisation'));

/*
    END TABLE: publ.projects

*/

/*
  TABLE: publ.personas
  DESCRIPTION:  
*/
drop table if exists publ.personas cascade;
create table publ.personas (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text not null,
    short_name text not null,
    description text not null,
    project_id uuid not null references publ.projects(id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
    create index on publ.personas(project_id);
  create index on publ.personas(created_at);
  create index on publ.personas(updated_at);
  create index on publ.personas(name);

-- RBAC
  grant select on publ.personas to :DATABASE_VISITOR;
    grant insert(name, short_name, description, project_id) on publ.personas to :DATABASE_VISITOR;
    grant update(name, short_name, description) on publ.personas to :DATABASE_VISITOR;
    grant delete on publ.personas to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.personas
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.personas enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.personas
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
  -- insert 4 personas for project Canto
  insert into publ.personas (id, name, short_name, description, project_id) values ('f7d728b7-c490-4118-bc67-eb2dce230811', 'Chanteur', 'Chanteur', 'Chanteur', (select id from publ.projects where name = 'Canto'));
  insert into publ.personas (id, name, short_name, description, project_id) values ('8d26313c-564a-47a4-8e12-8b83b39b5dc6', 'Chanteuse', 'Chanteuse', 'Chanteuse', (select id from publ.projects where name = 'Canto'));
  insert into publ.personas (id, name, short_name, description, project_id) values ('acff5612-9c8b-429b-8077-d2b98d48bb87', 'Choriste', 'Choriste', 'Choriste', (select id from publ.projects where name = 'Canto'));
/*
  END TABLE: publ.personas
*/

create or replace function publ.project_by_slug(project_slug text, organization_slug text) returns publ.projects as $$
  select proj from publ.projects proj
  inner join publ.organizations org on org.id = proj.organization_id
  where proj.slug = project_slug and org.slug = organization_slug
  limit 1;
$$ language sql stable security definer;

grant execute on function publ.project_by_slug(text, text) to :DATABASE_VISITOR;

--! split: 01100-project_domains.sql
/*
  TABLE: publ.domains
  DESCRIPTION: Domains represent the different areas of a project. For example, a project might have a "Frontend" domain and a "Backend" domain.
*/
drop table if exists publ.domains cascade;
create table publ.domains (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text not null,
    short_name text not null,
    "order" int,
    description text,
    project_id uuid not null references publ.projects(id) on delete cascade,
    color text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.domains(created_at);
  create index on publ.domains(updated_at);
    create index on publ.domains(project_id);
    create index on publ.domains("order");
    create index on publ.domains(name);

-- RBAC
  grant select on publ.domains to :DATABASE_VISITOR;
  grant insert (name, short_name, "order", description, project_id, color) on publ.domains to :DATABASE_VISITOR;
  grant update (name, short_name, "order", description, color) on publ.domains to :DATABASE_VISITOR;
  grant delete on publ.domains to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.domains
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.domains enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.domains
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
  insert into publ.domains (id,   name, short_name, description, project_id, color)
    values ('4e7cbb76-0923-4c5d-9e56-55305d99bd47', 'Front du Frontend site', 'FFE', 'The frontend domain', (select id from publ.projects where name='Canto'), '#f2345a');
    insert into publ.domains (id,   name, short_name,  description, project_id, color)
    values ('46b6681a-2465-4d49-b5b7-d1c6073b48ac', 'Back du Frontend site', 'BFE', 'The backend domain', (select id from publ.projects where name='Canto'), '#8736c4');
    insert into publ.domains (id,   name, short_name,  description, project_id, color)
    values ('4a41588f-0fa2-455c-b59a-6d5f9bb54145', 'API', 'API', 'The frontend domain', (select id from publ.projects where name='Canto'), '#c0c038');
    insert into publ.domains (id,   name, short_name,  description, project_id, color)
    values ('0ec3a435-c7ce-4fe4-9d0c-5e444ab47def', 'Workers', 'WK', 'The backend domain', (select id from publ.projects where name='Canto'), '#ff35f6');
    insert into publ.domains (id,   name, short_name,  description, project_id, color)
    values ('e5cbe352-5673-483d-a327-98d2c171e1d2', 'Database', 'DB', 'The backend domain', (select id from publ.projects where name='Canto'), '#e4c4f5');

/*
  END TABLE: publ.domains
*/


drop table if exists priv.update_domain_order_log cascade;
create table priv.update_domain_order_log (
  id uuid not null default uuid_generate_v4() primary key unique,
  project_id uuid not null references publ.projects(id) on delete cascade
);


create or replace function publ.update_domain_order() returns trigger as $$
declare
  max_order int;
begin

  if 
    exists (SELECT 1 FROM priv.update_domain_order_log WHERE project_id = NEW.project_id)
  then
      return NEW;
  end if;

  insert into priv.update_domain_order_log (project_id) values (NEW.project_id);

  if (TG_OP = 'INSERT') then
    if (NEW."order" is null) then
      -- Get the max "order" value for the organization
      select max("order") INTO max_order
      from publ.domains
      where project_id = NEW.project_id;
      if (max_order IS NOT NULL) then
        NEW."order" = max_order + 1;
      ELSE
        NEW."order" = 0;
      END if;
    ELSE
      -- Shift existing projects with higher "order" value
      update publ.domains
      set "order" = "order" + 1
      where project_id = NEW.project_id
        and "order" >= NEW."order";
    END if;
  elsif (TG_OP = 'UPDATE') then
    if (OLD."order" <> NEW."order") then
      -- Shift existing projects with higher "order" value
      if (OLD."order" < NEW."order") then
        update publ.domains
        set "order" = "order" - 1
        where project_id = NEW.project_id
          and "order" > OLD."order"
          and "order" <= NEW."order";
      else
        update publ.domains
        set "order" = "order" + 1
        where project_id = NEW.project_id
          and "order" >= NEW."order"
          and "order" < OLD."order";
      end if;
    end if;
  end if;
  delete from priv.update_domain_order_log where project_id = NEW.project_id;
  return NEW;
end;
$$ language plpgsql volatile security definer;

-- triggers
  create trigger _100_update_domain_order
  before insert or update on publ.domains
  for each row
  execute procedure publ.update_domain_order();

--! split: 01500-epics.sql
/*
  TABLE: publ.epics
  DESCRIPTION:  An epic is a group of stories that are related to each other. The epic is a building block of a project.
*/
drop table if exists publ.epics cascade;
create table publ.epics (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text not null,    
    "order" int,
    description text not null,
    icon text,
    project_id uuid not null references publ.projects(id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.epics(project_id);
  create index on publ.epics("order");
  create index on publ.epics(name);
  create index on publ.epics(created_at);
  create index on publ.epics(updated_at);

-- RBAC
  grant select on publ.epics to :DATABASE_VISITOR;
  grant insert(name, description, "order", icon, project_id) on publ.epics to :DATABASE_VISITOR;
  grant update(name, description, "order", icon) on publ.epics to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.epics
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.epics enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.epics
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
  -- insert 4 epics for project Canto
  insert into publ.epics (id, name, "order", description, project_id) values ('8968fba3-4289-4d56-b254-d3e7b538ce25', 'Authentification', 0, 'Gestion des comptes utilisateur, de leur inscription sur la plateforme et de leurs connexions', (select id from publ.projects where name = 'Canto'));
  -- publication / gestion des chants
  insert into publ.epics (id, name, "order", description, project_id) values ('c156e1b6-3d75-4fd9-b197-b67b7d20d352', 'Publication', 1, 'Gestion des chants, de leur publication et de leur modification', (select id from publ.projects where name = 'Canto'));
  -- contribution utilisateur
  insert into publ.epics (id, name, "order", description, project_id) values ('b0e3a892-d37e-4138-afaf-4c603814d704', 'Contribution', 2, 'Gestion des contributions des utilisateurs', (select id from publ.projects where name = 'Canto'));
  -- recherche de chants
  insert into publ.epics (id, name, "order", description, project_id) values ('480f53cd-7eae-4440-958c-8d92a666a872', 'Recherche', 3, 'Gestion de la recherche de chants, catégorisation avancée, moteur de recherche textuelle', (select id from publ.projects where name = 'Canto'));
/*
  END TABLE: publ.epics
*/


drop table if exists priv.update_epic_order_log cascade;
create table priv.update_epic_order_log (
  id uuid not null default uuid_generate_v4() primary key unique,
  project_id uuid not null references publ.projects(id) on delete cascade
);


create or replace function publ.update_epic_order() returns trigger as $$
declare
  max_order int;
begin


  if 
    exists (SELECT 1 FROM priv.update_epic_order_log WHERE project_id = NEW.project_id)
  then
      return NEW;
  end if;

  insert into priv.update_epic_order_log (project_id) values (NEW.project_id);

  if (TG_OP = 'INSERT') then
    if (NEW."order" is null) then
      -- Get the max "order" value for the organization
      select max("order") INTO max_order
      from publ.epics
      where project_id = NEW.project_id;
      if (max_order IS NOT NULL) then
        NEW."order" = max_order + 1;
      ELSE
        NEW."order" = 0;
      END if;
    ELSE
      -- Shift existing projects with higher "order" value
      update publ.epics
      set "order" = "order" + 1
      where project_id = NEW.project_id
        and "order" >= NEW."order";
    END if;
  elsif (TG_OP = 'UPDATE') then
    if (OLD."order" <> NEW."order") then
      -- Shift existing projects with higher "order" value
      if (OLD."order" < NEW."order") then
        update publ.epics
        set "order" = "order" - 1
        where project_id = NEW.project_id
          and "order" > OLD."order"
          and "order" <= NEW."order";
      else
        update publ.epics
        set "order" = "order" + 1
        where project_id = NEW.project_id
          and "order" >= NEW."order"
          and "order" < OLD."order";
      end if;
    end if;
  end if;
  delete from priv.update_epic_order_log where project_id = NEW.project_id;
  return NEW;
end;
$$ language plpgsql volatile security definer;

-- triggers
  create trigger _100_update_epic_order
  before insert or update on publ.epics
  for each row
  execute procedure publ.update_epic_order();

--! split: 02000-user_stories.sql
/*
  TABLE: publ.user_stories
  DESCRIPTION:  A user story is a description of a feature from the perspective of the end user. It is a building block of an epic.
*/
drop table if exists publ.user_stories cascade;
create table publ.user_stories (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text,
    "order" int,
    as_a uuid references publ.personas(id) on delete restrict,
    i_want text not null,
    so_that text,
    epic_id uuid references publ.epics(id) on delete restrict,
    validation_criteria text,
    comments text,
    variables text,
    parent_id uuid references publ.user_stories(id) on delete restrict,
    -- status text not null, //no status, for now it is computed from the tasks
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
    create index on publ.user_stories(epic_id);
     create index on publ.user_stories(as_a);
    create index on publ.user_stories("order");
    create index on publ.user_stories(parent_id);
  create index on publ.user_stories(created_at);
  create index on publ.user_stories(updated_at);

-- RBAC
  grant select on publ.user_stories to :DATABASE_VISITOR;
    grant insert(name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id) on publ.user_stories to :DATABASE_VISITOR;
    grant update(name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id) on publ.user_stories to :DATABASE_VISITOR;
    grant delete on publ.user_stories to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.user_stories
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.user_stories enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.user_stories
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
  -- 5 user stories pour chacun des epics suivants: Authentification, Contribution, Contribution, Recherche

  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('461d71b1-6610-46cb-984c-52bf86953420', 'En tant qu''utilisateur, je veux pouvoir m''authentifier sur le site, afin de pouvoir accéder à mes données personnelles.', 0, null, 'm''authentifier sur le site', 'pouvoir accéder à mes données personnelles', (select id from publ.epics where name='Authentification'), 'Je peux me connecter avec mon nom d''utilisateur et mon mot de passe.', 'Les données personnelles sont les données que l''utilisateur a renseignées lors de son inscription.', 'username, password', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('8dcdfd04-1ea0-4f82-8b0a-6ac3f2d6a75a', 'En tant qu''utilisateur, je veux pouvoir m''inscrire sur le site, afin de pouvoir accéder à mes données personnelles.', 1, null, 'm''inscrire sur le site', 'pouvoir accéder à mes données personnelles', (select id from publ.epics where name='Authentification'), 'Je peux me connecter avec mon nom d''utilisateur et mon mot de passe.', 'Les données personnelles sont les données que l''utilisateur a renseignées lors de son inscription.', 'username, password', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('aab99bcd-29d0-4207-b5a3-7a09ceb2e804', 'En tant qu''utilisateur, je veux pouvoir modifier mes données personnelles, afin de pouvoir les mettre à jour.', 2, null, 'modifier mes données personnelles', 'pouvoir les mettre à jour', (select id from publ.epics where name='Authentification'), 'Je peux modifier mes données personnelles.', 'Les données personnelles sont les données que l''utilisateur a renseignées lors de son inscription.', 'username, password', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('8c96fc90-18c5-4b78-a51b-49f68c3f2aee', 'En tant qu''utilisateur, je veux pouvoir supprimer mon compte, afin de pouvoir supprimer mes données personnelles.', 3, null, 'supprimer mon compte', 'pouvoir supprimer mes données personnelles', (select id from publ.epics where name='Authentification'), 'Je peux supprimer mon compte.', 'Les données personnelles sont les données que l''utilisateur a renseignées lors de son inscription.', 'username, password', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('51403d51-0aec-4740-a441-2a259c0dbe60', 'En tant qu''utilisateur, je veux pouvoir me déconnecter du site, afin de pouvoir quitter le site.', 4, null, 'me déconnecter du site', 'pouvoir quitter le site', (select id from publ.epics where name='Authentification'), 'Je peux me déconnecter du site.', 'Les données personnelles sont les données que l''utilisateur a renseignées lors de son inscription.', 'username, password', null, now(), now());

  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('b2643378-d7f0-48f7-9445-21e8273228e2', 'En tant qu''utilisateur, je veux pouvoir publier un article, afin de pouvoir le partager avec les autres utilisateurs.', 0, null, 'publier un article', 'pouvoir le partager avec les autres utilisateurs',  (select id from publ.epics where name='Contribution'), 'Je peux publier un article.', 'Les articles sont les publications que les utilisateurs peuvent partager avec les autres utilisateurs.', 'title, content', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('d2155aaa-f3e8-443c-abca-3988fafd8a5e', 'En tant qu''utilisateur, je veux pouvoir modifier un article, afin de pouvoir le mettre à jour.', 1, null, 'modifier un article', 'pouvoir le mettre à jour',  (select id from publ.epics where name='Publication'), 'Je peux modifier un article.', 'Les articles sont les publications que les utilisateurs peuvent partager avec les autres utilisateurs.', 'title, content', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('4a9712c8-eae4-4cce-9db2-f5777c4814a8', 'En tant qu''utilisateur, je veux pouvoir supprimer un article, afin de pouvoir le retirer de la liste des articles.', 2, null, 'supprimer un article', 'pouvoir le retirer de la liste des articles',  (select id from publ.epics where name='Publication'), 'Je peux supprimer un article.', 'Les articles sont les publications que les utilisateurs peuvent partager avec les autres utilisateurs.', 'title, content', null, now(), now());

  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('035f4838-21da-4021-8e41-4ec19be5f286', 'En tant qu''utilisateur, je veux pouvoir commenter un article, afin de pouvoir donner mon avis sur l''article.', 0, null, 'commenter un article', 'pouvoir donner mon avis sur l''article',  (select id from publ.epics where name='Contribution'), 'Je peux commenter un article.', 'Les commentaires sont les avis que les utilisateurs peuvent donner sur les articles.', 'content', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('8da1f0c5-bbbc-48fd-8109-2c7bcffd6794', 'En tant qu''utilisateur, je veux pouvoir modifier un commentaire, afin de pouvoir le mettre à jour.', 1, null, 'modifier un commentaire', 'pouvoir le mettre à jour',  (select id from publ.epics where name='Contribution'), 'Je peux modifier un commentaire.', 'Les commentaires sont les avis que les utilisateurs peuvent donner sur les articles.', 'content', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('4d8ecec7-7935-4757-a586-a4ae527a42db', 'En tant qu''utilisateur, je veux pouvoir supprimer un commentaire, afin de pouvoir le retirer de la liste des commentaires.', 2, null, 'supprimer un commentaire', 'pouvoir le retirer de la liste des commentaires',  (select id from publ.epics where name='Contribution'), 'Je peux supprimer un commentaire.', 'Les commentaires sont les avis que les utilisateurs peuvent donner sur les articles.', 'content', null, now(), now());

  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('c5f25460-159f-456c-b566-f4e46955dc6b', 'En tant qu''utilisateur, je veux pouvoir créer un compte, afin de pouvoir accéder à toutes les fonctionnalités du site.', 0, null, 'créer un compte', 'pouvoir accéder à toutes les fonctionnalités du site',  (select id from publ.epics where name='Recherche'), 'Je peux créer un compte.', 'Les comptes sont les accès que les utilisateurs peuvent créer pour accéder à toutes les fonctionnalités du site.', 'username, password', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('e1762de5-09f4-4832-b4bf-f04953c71aca', 'En tant qu''utilisateur, je veux pouvoir modifier un compte, afin de pouvoir le mettre à jour.', 1, null, 'modifier un compte', 'pouvoir le mettre à jour',  (select id from publ.epics where name='Recherche'), 'Je peux modifier un compte.', 'Les comptes sont les accès que les utilisateurs peuvent créer pour accéder à toutes les fonctionnalités du site.', 'username, password', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('fb98f4ef-f5ae-4970-86e7-cffcafa15696', 'En tant qu''utilisateur, je veux pouvoir supprimer un compte, afin de pouvoir le retirer de la liste des comptes.', 2, null, 'supprimer un compte', 'pouvoir le retirer de la liste des comptes',  (select id from publ.epics where name='Recherche'), 'Je peux supprimer un compte.', 'Les comptes sont les accès que les utilisateurs peuvent créer pour accéder à toutes les fonctionnalités du site.', 'username, password', null, now(), now());

  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('9e10aad1-5f93-4b7c-b257-a52d11a69983', 'En tant qu''utilisateur, je veux pouvoir créer un groupe, afin de pouvoir partager des articles avec d''autres utilisateurs.', 0, null, 'créer un groupe', 'pouvoir partager des articles avec d''autres utilisateurs',  (select id from publ.epics where name='Recherche'), 'Je peux créer un groupe.', 'Les groupes sont les listes d''utilisateurs que les utilisateurs peuvent créer pour partager des articles avec d''autres utilisateurs.', 'name', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('cf946f2f-e1cc-48f3-82ed-2fad1f8528b0', 'En tant qu''utilisateur, je veux pouvoir modifier un groupe, afin de pouvoir le mettre à jour.', 1, null, 'modifier un groupe', 'pouvoir le mettre à jour',  (select id from publ.epics where name='Recherche'), 'Je peux modifier un groupe.', 'Les groupes sont les listes d''utilisateurs que les utilisateurs peuvent créer pour partager des articles avec d''autres utilisateurs.', 'name', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('d1a34be5-595b-40a8-9bf6-8b11de5a9548', 'En tant qu''utilisateur, je veux pouvoir supprimer un groupe, afin de pouvoir le retirer de la liste des groupes.', 2, null, 'supprimer un groupe', 'pouvoir le retirer de la liste des groupes',  (select id from publ.epics where name='Recherche'), 'Je peux supprimer un groupe.', 'Les groupes sont les listes d''utilisateurs que les utilisateurs peuvent créer pour partager des articles avec d''autres utilisateurs.', 'name', null, now(), now());



/*
  END TABLE: publ.user_stories
*/

drop table if exists priv.update_user_story_order_log cascade;
create table priv.update_user_story_order_log (
  id uuid not null default uuid_generate_v4() primary key unique,
  epic_id uuid not null references publ.epics(id) on delete cascade
);

create or replace function publ.update_user_story_order() returns trigger as $$
declare
  max_order int;
begin


  if 
    exists (SELECT 1 FROM priv.update_user_story_order_log WHERE epic_id = NEW.epic_id)
  then
      return NEW;
  end if;

  insert into priv.update_user_story_order_log (epic_id) values (NEW.epic_id);

  if (TG_OP = 'INSERT') then
    if (NEW."order" is null) then
      -- Get the max "order" value for the organization
      select max("order") INTO max_order
      from publ.user_stories
      where epic_id = NEW.epic_id;
      if (max_order IS NOT NULL) then
        NEW."order" = max_order + 1;
      ELSE
        NEW."order" = 0;
      END if;
    ELSE
      -- Shift existing projects with higher "order" value
      update publ.user_stories
      set "order" = "order" + 1
      where epic_id = NEW.epic_id
        and "order" >= NEW."order";
    END if;
  elsif (TG_OP = 'UPDATE') then
    if (OLD."order" <> NEW."order") then
      -- Shift existing projects with higher "order" value
      if (OLD."order" < NEW."order") then
        update publ.user_stories
        set "order" = "order" - 1
        where epic_id = NEW.epic_id
          and "order" > OLD."order"
          and "order" <= NEW."order";
      else
        update publ.user_stories
        set "order" = "order" + 1
        where epic_id = NEW.epic_id
          and "order" >= NEW."order"
          and "order" < OLD."order";
      end if;
    end if;
  end if;

  delete from priv.update_user_story_order_log where epic_id = NEW.epic_id;

  return NEW;
end;
$$ language plpgsql volatile security definer;

-- triggers
  create trigger _100_update_user_story_order
  before insert or update on publ.user_stories
  for each row
  execute procedure publ.update_user_story_order();

--! split: 02500-tasks.sql
drop table if exists publ.task_status cascade;
create table publ.task_status (
    type text primary key,
    description text
);
comment on table publ.task_status is E'@enum';

insert into publ.task_status values
    ('BACKLOG', 'The task is in the backlog and has not been started.'),
    ('IN_PROGRESS', 'The task is in progress.'),
    ('DONE', 'The task is done.'),
    ('REVIEW', 'The task is in review.'),
    ('BLOCKED', 'The task is blocked by something else.'),
    ('DELETED', 'The task has been deleted.');


/*
  TABLE: publ.tasks
  DESCRIPTION:  A task is a unit of work that needs to be done. It is a building block of a story.
*/
drop table if exists publ.tasks cascade;
create table publ.tasks (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text not null,
    description text not null,
    "order" int,
    user_story_id uuid not null references publ.user_stories(id) on delete cascade,
    domain_id uuid references publ.domains(id) on delete restrict,
    status text references publ.task_status(type) on delete restrict default 'BACKLOG',
    estimate integer not null,
    parent_id uuid references publ.tasks(id) on delete restrict,
    uncertainty integer not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
    create index on publ.tasks(user_story_id);
    create index on publ.tasks(status);
    create index on publ.tasks(estimate);
    create index on publ.tasks(uncertainty);
    create index on publ.tasks(parent_id);
    create index on publ.tasks(domain_id);
    create index on publ.tasks(name);
    create index on publ.tasks("order");
  create index on publ.tasks(created_at);
  create index on publ.tasks(updated_at);

-- RBAC
  grant select on publ.tasks to :DATABASE_VISITOR;
 grant insert (name, description, user_story_id, domain_id, "order", status, estimate, parent_id, uncertainty) on publ.tasks to :DATABASE_VISITOR;
 grant update (name, description, user_story_id, domain_id, "order", status, estimate, parent_id, uncertainty) on publ.tasks to :DATABASE_VISITOR;
  grant delete on publ.tasks to :DATABASE_VISITOR;
  


-- triggers
  create trigger _100_timestamps
  before insert or update on publ.tasks
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.tasks enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.tasks
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.tasks
*/

drop table if exists priv.update_task_order_log cascade;
create table priv.update_task_order_log (
  id uuid not null default uuid_generate_v4() primary key unique,
  user_story_id uuid not null references publ.user_stories(id) on delete cascade
);


create or replace function publ.update_task_order() returns trigger as $$
declare
  max_order int;
begin

  if 
    exists (SELECT 1 FROM priv.update_task_order_log WHERE user_story_id = NEW.user_story_id)
  then
      return NEW;
  end if;

  insert into priv.update_task_order_log (user_story_id) values (NEW.user_story_id);
  if (TG_OP = 'INSERT') then
    if (NEW."order" is null) then
      -- Get the max "order" value for the organization
      select max("order") INTO max_order
      from publ.tasks
      where user_story_id = NEW.user_story_id;
      if (max_order IS NOT NULL) then
        NEW."order" = max_order + 1;
      ELSE
        NEW."order" = 0;
      END if;
    ELSE  
      -- Shift existing tasks with higher "order" value
      update publ.tasks
      set "order" = "order" + 1
      where user_story_id = NEW.user_story_id
        and "order" >= NEW."order";
    END if;
  elsif (TG_OP = 'UPDATE') then
    if (OLD."order" <> NEW."order") then
      -- Shift existing tasks with higher "order" value
      if (OLD."order" < NEW."order") then
        update publ.tasks
        set "order" = "order" - 1
        where user_story_id = NEW.user_story_id
          and "order" > OLD."order"
          and "order" <= NEW."order";
      else
        update publ.tasks
        set "order" = "order" + 1
        where user_story_id = NEW.user_story_id
          and "order" >= NEW."order"
          and "order" < OLD."order";
      end if;
    end if;
  end if;
  delete from priv.update_task_order_log where user_story_id = NEW.user_story_id;
  return NEW;
end;
$$ language plpgsql volatile security definer;

create trigger update_task_order
before insert or update ON publ.tasks
FOR EACH ROW
EXECUTE FUNCTION publ.update_task_order();
