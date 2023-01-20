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

create or replace function publ.update_epic_order() returns trigger as $$
declare
  max_order int;
begin
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
  return NEW;
end;
$$ language plpgsql volatile security definer;

-- triggers
  create trigger _100_update_epic_order
  before insert or update on publ.epics
  for each row
  execute procedure publ.update_epic_order();