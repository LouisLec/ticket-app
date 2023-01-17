/*
  TABLE: publ.user_stories
  DESCRIPTION:  A user story is a description of a feature from the perspective of the end user. It is a building block of an epic.
*/
drop table if exists publ.user_stories cascade;
create table publ.user_stories (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text not null,
    as_a uuid references publ.project_personas(id) on delete restrict,
    i_want text not null,
    so_that text,
    epic_id uuid references publ.epics(id) on delete restrict,
    validation_criteria text,
    comments text,
    variables text,
    -- status text not null, //no status, for now it is computed from the tasks
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
    create index on publ.user_stories(epic_id);
     create index on publ.user_stories(as_a);
  create index on publ.user_stories(created_at);
  create index on publ.user_stories(updated_at);

-- RBAC
  grant select on publ.user_stories to :DATABASE_VISITOR;

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
/*
  END TABLE: publ.user_stories
*/