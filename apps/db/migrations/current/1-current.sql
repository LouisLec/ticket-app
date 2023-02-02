-- Enter migration here
update publ.users set firstname = 'Louis';

truncate table publ.organization_memberships;
insert into publ.organization_memberships (organization_id, user_id, role) values (
    
    (select id from publ.organizations where name='The Organisation'),
    (select id from publ.users where email='admin@localhost') , 'ADMIN');