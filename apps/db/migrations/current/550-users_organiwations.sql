drop table if exists publ.organization_memberships_roles_enum cascade;
create table publ.organization_memberships_roles_enum (
    type text primary key,
    description text
);
comment on table publ.organization_memberships_roles_enum is E'@enum';

insert into publ.organization_memberships_roles_enum values
    ('OWNER', 'Owner of the organization'),
    ('ADMIN', 'Admin of the organization'),
    ('DEVELOPER', 'Member of the organization'),
    ('MANAGER', 'Manager of the organization'),
    ('CLIENT', 'Client of the organization'),
    ('GUEST', 'Guest of the organization');


/*
  TABLE: publ.organization_memberships
  DESCRIPTION: Appartenance des utilisateurs aux organisations
*/
drop table if exists publ.organization_memberships cascade;
create table publ.organization_memberships (
    id uuid not null default uuid_generate_v4() primary key unique, 
    organization_id uuid not null references publ.organizations(id) on delete cascade,
    user_id uuid not null references publ.users(id) on delete cascade,
    role text not null default 'GUEST' references publ.organization_memberships_roles_enum(type) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (organization_id, user_id)
);

-- indexes
  create index on publ.organization_memberships(created_at);
  create index on publ.organization_memberships(updated_at);
    create index on publ.organization_memberships(organization_id);
    create index on publ.organization_memberships(user_id);
    create index on publ.organization_memberships(role);

-- RBAC
  grant select on publ.organization_memberships to :DATABASE_VISITOR;
  grant insert (organization_id, user_id, role) on publ.organization_memberships to :DATABASE_VISITOR;
    grant update ( role) on publ.organization_memberships to :DATABASE_VISITOR;
    grant delete on publ.organization_memberships to :DATABASE_VISITOR;


-- triggers
  create trigger _100_timestamps
  before insert or update on publ.organization_memberships
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.organization_memberships enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.organization_memberships
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.organization_memberships
*/