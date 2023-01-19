
/*
    TABLE: publ.projectsprojects
    DESCRIPTION:  A project is a group of epics that are related to each other. The project as a whole is a goal that the organization is trying to achieve.
*/
drop table if exists publ.projects cascade;
create table publ.projects (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text not null,
    description text not null,
  "order" integer,
    organization_id uuid not null references publ.organizations(id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint projects_organization_id_name_key unique (organization_id, name)
);

-- indexes
    create index on publ.projects(organization_id);
    create index on publ.projects(created_at);
    create index on publ.projects(updated_at);
    create index on publ.projects("order");

-- RBAC
    grant select on publ.projects to :DATABASE_VISITOR;
    grant insert(name, description, organization_id) on publ.projects to :DATABASE_VISITOR;
    grant update(name, description) on publ.projects to :DATABASE_VISITOR;

-- triggers
    create trigger _100_timestamps
    before insert or update on publ.projects
    for each row
    execute procedure priv.tg__timestamps();

-- RLS
    alter table publ.projects enable row level security;

    create policy no_limit /*TODO: update policy*/
    on publ.projects
    for all
    using (true)
    with check(true);

-- fixtures
    -- fixtures go here
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
    grant insert(name, description, project_id) on publ.personas to :DATABASE_VISITOR;
    grant update(name, description) on publ.personas to :DATABASE_VISITOR;

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
/*
  END TABLE: publ.personas
*/


create or replace function publ.update_project_order() returns trigger as $$
declare
  max_order int;
begin
  if (TG_OP = 'INSERT') then
    if (NEW."order" is null) then
      -- Get the max "order" value for the organization
      select max("order") INTO max_order
      from publ.projects
      where organization_id = NEW.organization_id;
      if (max_order IS NOT NULL) then
        NEW."order" = max_order + 1;
      ELSE
        NEW."order" = 0;
      END if;
    ELSE
      -- Shift existing projects with higher "order" value
      update publ.projects
      set "order" = "order" + 1
      where organization_id = NEW.organization_id
        and "order" >= NEW."order";
    END if;
  elsif (TG_OP = 'UPDATE') then
    if (OLD."order" <> NEW."order") then
      -- Shift existing projects with higher "order" value
      if (OLD."order" < NEW."order") then
        update publ.projects
        set "order" = "order" - 1
        where organization_id = NEW.organization_id
          and "order" > OLD."order"
          and "order" <= NEW."order";
      else
        update publ.projects
        set "order" = "order" + 1
        where organization_id = NEW.organization_id
          and "order" >= NEW."order"
          and "order" < OLD."order";
      end if;
    end if;
  end if;
  return NEW;
end;
$$ language plpgsql volatile security definer;

create trigger update_project_order
before insert or update ON publ.projects
FOR EACH ROW
EXECUTE FUNCTION publ.update_project_order();