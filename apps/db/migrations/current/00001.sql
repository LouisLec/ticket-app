drop schema if exists publ cascade;
drop schema if exists priv cascade;

/*
 * The `public` *schema* contains things like PostgreSQL extensions. We
 * deliberately do not install application logic into the public schema
 * (instead storing it to publ/priv as appropriate),
 * but none the less we don't want untrusted roles to be able to install or
 * modify things into the public schema.
 *
 * The `public` *role* is automatically inherited by all other roles; we only
 * want specific roles to be able to access our database so we must revoke
 * access to the `public` role.
 */
revoke all on schema public from public;

alter default privileges revoke all on sequences from public;
alter default privileges revoke all on functions from public;

-- Of course we want our database owner to be able to do anything inside the
-- database, so we grant access to the `public` schema:
grant all on schema public to :DATABASE_OWNER;


/*
 * Read about our publ/priv schemas here:
 * https://www.graphile.org/postgraphile/namespaces/#advice
 *
 * Note this pattern is not required to use PostGraphile, it's merely the
 * preference of the author of this package.
 */
create schema publ;
create schema priv;

-- The 'visitor' role (used by PostGraphile to represent an end user) may
-- access the public, and publ schemas (but _NOT_ the
-- priv schema).
grant usage on schema public, publ to :DATABASE_VISITOR;

-- We want the `visitor` role to be able to insert rows (`serial` data type
-- creates sequences, so we need to grant access to that).
alter default privileges in schema public, publ
  grant usage, select on sequences to :DATABASE_VISITOR;

-- And the `visitor` role should be able to call functions too.
alter default privileges in schema public, publ
  grant execute on functions to :DATABASE_VISITOR;
