
/*
    TABLE: publ.projectsprojects
    DESCRIPTION:  A project is a group of epics that are related to each other. The project as a whole is a goal that the organization is trying to achieve.
*/
drop table if exists publ.projects cascade;
create table publ.projects (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text not null,
    description text not null,
    organization_id uuid not null references publ.organizations(id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
    create index on publ.projects(organization_id);
    create index on publ.projects(created_at);
    create index on publ.projects(updated_at);

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
  TABLE: publ.project_personas
  DESCRIPTION:  
*/
drop table if exists publ.project_personas cascade;
create table publ.project_personas (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text not null,
    description text not null,
    project_id uuid not null references publ.projects(id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
    create index on publ.project_personas(project_id);
  create index on publ.project_personas(created_at);
  create index on publ.project_personas(updated_at);

-- RBAC
  grant select on publ.project_personas to :DATABASE_VISITOR;
    grant insert(name, description, project_id) on publ.project_personas to :DATABASE_VISITOR;
    grant update(name, description) on publ.project_personas to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.project_personas
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.project_personas enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.project_personas
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.project_personas
*/