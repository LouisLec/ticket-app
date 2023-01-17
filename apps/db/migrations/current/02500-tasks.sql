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
    story_id uuid not null references publ.user_stories(id) on delete cascade,
    status text references publ.task_status(type) on delete restrict default 'BACKLOG',
    estimate integer not null,
    uncertainty integer not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
    create index on publ.tasks(story_id);
    create index on publ.tasks(status);
    create index on publ.tasks(estimate);
    create index on publ.tasks(uncertainty);

  create index on publ.tasks(created_at);
  create index on publ.tasks(updated_at);

-- RBAC
  grant select on publ.tasks to :DATABASE_VISITOR;

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