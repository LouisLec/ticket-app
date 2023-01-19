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


create or replace function publ.update_user_story_order() returns trigger as $$
declare
  max_order int;
begin
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
  return NEW;
end;
$$ language plpgsql volatile security definer;

-- triggers
  create trigger _100_update_user_story_order
  before insert or update on publ.user_stories
  for each row
  execute procedure publ.update_user_story_order();

