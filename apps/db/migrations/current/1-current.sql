
ALTER TABLE publ.organizations ALTER COLUMN logo_url DROP NOT NULL;

alter table publ.organizations drop column if exists is_personal_organization;
alter table publ.organizations add column is_personal_organization boolean default false;

alter table publ.organizations drop column if exists created_by_user_id;
alter table publ.organizations add column created_by_user_id uuid references publ.users(id) on delete restrict default publ.current_user_id();

create index on publ.organizations (created_by_user_id);
create index on publ.organizations (is_personal_organization);
CREATE UNIQUE INDEX only_one_personal_org_per_user ON publ.organizations (created_by_user_id) WHERE is_personal_organization = true;

drop function if exists priv.tg_organization__insert_with_user() cascade;
create function priv.tg_organization__insert_with_user() returns trigger as $$
begin
  insert into publ.organizations(
    name,
    description,
    is_personal_organization,
    created_by_user_id
  ) values(
    NEW.firstname || ' ' || NEW.lastname,
    'Personnal organization',
    true,
    NEW.id
  ) on conflict do nothing;
  return NEW;
end;

$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;


create trigger _500_insert_organization
  after insert on publ.users
  for each row
  execute procedure priv.tg_organization__insert_with_user();
comment on function priv.tg_organization__insert_with_user() is
  E'Ensures that every user record has an associated organization.';

grant all on table publ.organizations to :DATABASE_VISITOR;
drop policy if exists no_limit on publ.organizations;
 create policy no_limit 
   on publ.organizations
   for all
   using (true)
   with check(true);



delete from publ.users where email='admin@localhost';
insert into publ.users (id, firstname, lastname, email, is_admin) values ('160608c8-939b-481f-8bd5-ea33a294d424', 'admin', 'admin', 'admin@localhost', true);
update priv.user_secrets set password_hash=crypt('admin', gen_salt('bf')) where user_id='160608c8-939b-481f-8bd5-ea33a294d424';


insert into publ.users (id, firstname, lastname, email, is_admin) values ('5f40e1d7-b462-4e35-9d1d-40fa44f5d70e', 'Jo', 'user', 'user@localhost', true) on conflict do nothing;
update priv.user_secrets set password_hash=crypt('user', gen_salt('bf')) where user_id='5f40e1d7-b462-4e35-9d1d-40fa44f5d70e';


drop function if exists publ.users_personal_organization cascade;
create function publ.users_personal_organization(any_user publ.users) returns publ.organizations as $$
select * from publ.organizations where created_by_user_id = any_user.id and is_personal_organization = true limit 1;
$$ language sql stable set search_path to publ, priv, pg_catalog, public, pg_temp;
grant execute on function publ.users_personal_organization to :DATABASE_VISITOR;


insert into publ.organization_memberships (organization_id, user_id, role) values (
    
    (select id from publ.organizations where name='The Organisation'),
    (select id from publ.users where email='admin@localhost') , 'ADMIN')
    on conflict do nothing;

 