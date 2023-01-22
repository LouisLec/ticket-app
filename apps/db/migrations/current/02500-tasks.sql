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


create or replace function publ.update_task_order() returns trigger as $$
declare
  max_order int;
begin
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
  return NEW;
end;
$$ language plpgsql volatile security definer;

create trigger update_task_order
before insert or update ON publ.tasks
FOR EACH ROW
EXECUTE FUNCTION publ.update_task_order();