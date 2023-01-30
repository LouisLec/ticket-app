--! Previous: sha1:dc0be9ec06b12df32aa2982128f0634d24bc4590
--! Hash: sha1:6d6bbfcb56c90e09e9af222cc538e952f77c2aca
--! Message: fix_login_and_add_US_field

--! split: 1-current.sql
truncate publ.users cascade;
insert into publ.users (id, firstname, lastname, email, is_admin) values ('160608c8-939b-481f-8bd5-ea33a294d424', 'admin', 'admin', 'admin@localhost', true);
update priv.user_secrets set password_hash=crypt('admin', gen_salt('bf')) where user_id='160608c8-939b-481f-8bd5-ea33a294d424';

drop function if exists publ.login cascade;
create function publ.login(email citext, password text) returns publ.jwt as $$  
declare
    v_user_id uuid;
    v_password_hash text;
begin
    select id, password_hash into v_user_id, v_password_hash from publ.users usr join priv.user_secrets sec on usr.id = sec.user_id where usr.email = login.email;
    if crypt(password, v_password_hash) = v_password_hash then
        return (v_user_id, extract(epoch from (now() + interval '20 days')))::publ.jwt;
    else
        raise exception 'invalid password';
    end if;
end;
$$ language plpgsql volatile security definer;
grant execute on function publ.login to :DATABASE_VISITOR;



alter table publ.user_stories drop column if exists rough_estimate;
alter table publ.user_stories add column rough_estimate int;
