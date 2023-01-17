

/*
  TABLE: publ.organizations
  DESCRIPTION: An organisation is a group of people who work together on projects.
*/
drop table if exists publ.organizations cascade;
create table publ.organizations (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text not null,
    description text not null,
    logo_url text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.organizations(created_at);
  create index on publ.organizations(updated_at);

-- RBAC
  grant select on publ.organizations to :DATABASE_VISITOR;
    grant insert(name, description, logo_url) on publ.organizations to :DATABASE_VISITOR;
    grant update(name, description, logo_url) on publ.organizations to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.organizations
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.organizations enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.organizations
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.organizations
*/