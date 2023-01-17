drop table if exists publ.epics cascade;
create table publ.epics (
    id uuid not null default uuid_generate_v4() primary key unique, 
    title text not null,
    icon text not null,
    description text not null,
    project_id uuid not null references publ.projects(id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
alter table publ.epics enable row level security;
grant select on publ.epics to :DATABASE_VISITOR;
grant insert(title, icon, description, project_id) on publ.epics to :DATABASE_VISITOR;
grant update(title, icon, description) on publ.epics to :DATABASE_VISITOR;
create trigger _100_timestamps

    before insert or update on publ.epics
    for each row
    execute procedure priv.tg__timestamps();

/*
  TABLE: publ.epics
  DESCRIPTION:  An epic is a group of stories that are related to each other. The epic is a building block of a project.
*/
drop table if exists publ.epics cascade;
create table publ.epics (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text not null,
    description text not null,
    icon text not null,
    project_id uuid not null references publ.projects(id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.epics(project_id);
  create index on publ.epics(created_at);
  create index on publ.epics(updated_at);

-- RBAC
  grant select on publ.epics to :DATABASE_VISITOR;
  grant insert(name, description, icon, project_id) on publ.epics to :DATABASE_VISITOR;
  grant update(name, description, icon) on publ.epics to :DATABASE_VISITOR;

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
/*
  END TABLE: publ.epics
*/