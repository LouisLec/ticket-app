drop type if exists publ.jwt;
create type publ.jwt as (
    sub uuid,
    exp bigint
);


 drop function if exists publ.current_user_id cascade;
create function publ.current_user_id() returns uuid as $$
    select nullif(current_setting('jwt.claims.sub', true), '')::uuid;
$$ language sql stable;
comment on function publ.current_user_id() is
  E'Handy method to get the current user ID.';
  grant execute on function publ.current_user_id to :DATABASE_VISITOR;

  create function publ.current_user() returns publ.users as $$
  select users.* from publ.users where id = publ.current_user_id();
$$ language sql stable;
comment on function publ.current_user() is
  E'The currently logged in user (or null if not logged in).';


drop function if exists publ.register cascade;
create function publ.register(
    email citext, 
    firstname text,
    lastname text,
    password text,
    avatar_url text default null
) returns publ.jwt as $$
declare
    v_user_id uuid;
begin
    insert into publ.users (email, firstname, lastname, avatar_url) values (email, firstname, lastname, avatar_url) returning id into v_user_id;
    insert into priv.user_secrets as us (user_id, password_hash) values (v_user_id, crypt(password, gen_salt('bf')))
    on conflict (user_id) do update set password_hash = excluded.password_hash;
    return (v_user_id, extract(epoch from (now() + interval '2 days')))::publ.jwt;

end;
$$ language plpgsql volatile security definer;
grant execute on function publ.register to :DATABASE_VISITOR;

drop function if exists publ.login cascade;
create function publ.login(email citext, password text) returns publ.jwt as $$  
declare
    user_id uuid;
    password_hash text;
begin
    select id, password_hash into user_id, password_hash from publ.users join priv.user_secrets on users.id = user_secrets.user_id where email = email;
    if crypt(password, password_hash) = password_hash then
        return (user_id, extract(epoch from (now() + interval '20 days')))::publ.jwt;
    else
        raise exception 'invalid password';
    end if;
end;
$$ language plpgsql volatile security definer;
grant execute on function publ.login to :DATABASE_VISITOR;



/*
 * Because you can register with username/password or using OAuth (social
 * login), we need a way to tell the user whether or not they have a
 * password. This is to help the UI display the right interface: change
 * password or set password.
 */
create function publ.users_has_password(u publ.users) returns boolean as $$
  select (password_hash is not null) from priv.user_secrets where user_secrets.user_id = u.id and u.id = publ.current_user_id();
$$ language sql stable security definer set search_path to pg_catalog, public, pg_temp;

