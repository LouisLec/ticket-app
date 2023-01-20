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

create or replace function publ.update_domain_order() returns trigger as $$
declare
  max_order int;
begin
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
  return NEW;
end;
$$ language plpgsql volatile security definer;

-- triggers
  create trigger _100_update_domain_order
  before insert or update on publ.domains
  for each row
  execute procedure publ.update_domain_order();