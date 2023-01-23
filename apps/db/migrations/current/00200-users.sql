/*
  TABLE: publ.users
  DESCRIPTION: Users of the app
*/
drop table if exists publ.users cascade;
create table publ.users (
    id uuid not null default uuid_generate_v4() primary key unique, 
    firstname text not null,
    lastname text not null,
    avatar_url text,
    is_admin boolean not null default false,
    email citext unique not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.users(created_at);
  create index on publ.users(updated_at);
  create index on publ.users(email);

-- RBAC
  grant select on publ.users to :DATABASE_VISITOR;
  grant update (firstname, avatar_url,  lastname, email) on publ.users to :DATABASE_VISITOR;
  grant delete on publ.users to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.users
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.users enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.users
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.users
*/


/*
  TABLE: priv.user_secrets
  DESCRIPTION: Les infos confidentielles de l'utilisateur
*/
drop table if exists priv.user_secrets cascade;
create table priv.user_secrets (
  user_id uuid not null primary key references publ.users on delete cascade,
  password_hash text,
  last_login_at timestamptz not null default now(),
  failed_password_attempts int not null default 0,
  first_failed_password_attempt timestamptz,
  reset_password_token text,
  reset_password_token_generated timestamptz,
  failed_reset_password_attempts int not null default 0,
  first_failed_reset_password_attempt timestamptz,
  delete_account_token text,
  delete_account_token_generated timestamptz
);

-- indexes


-- RBAC
  grant select on priv.user_secrets to :DATABASE_VISITOR;

-- triggers

-- RLS
  alter table priv.user_secrets enable row level security;

-- fixtures
  -- fixtures go here
/*
  END TABLE: priv.user_secrets
*/



/*
 * When we insert into `users` we _always_ want there to be a matching
 * `user_secrets` entry, so we have a trigger to enforce this:
 */
create function priv.tg_user_secrets__insert_with_user() returns trigger as $$
begin
  insert into priv.user_secrets(user_id) values(NEW.id) on conflict do nothing;
  return NEW;
end;

$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;
create trigger _500_insert_secrets
  after insert on publ.users
  for each row
  execute procedure priv.tg_user_secrets__insert_with_user();
comment on function priv.tg_user_secrets__insert_with_user() is
  E'Ensures that every user record has an associated user_secret record.';

