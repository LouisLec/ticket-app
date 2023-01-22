/*
 * These triggers are commonly used across many tables.
 */

 /*
 * This trigger is used on tables with created_at and updated_at to ensure that
 * these timestamps are kept valid (namely: `created_at` cannot be changed, and
 * `updated_at` must be monotonically increasing).
 */
create function priv.tg__timestamps() returns trigger as $$
begin
  NEW.created_at = (case when TG_OP = 'INSERT' then NOW() else OLD.created_at end);
  NEW.updated_at = (case when TG_OP = 'UPDATE' and OLD.updated_at >= NOW() then OLD.updated_at + interval '1 millisecond' else NOW() end);
  return NEW;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;
comment on function priv.tg__timestamps() is
  E'This trigger should be called on all tables with created_at, updated_at - it ensures that they cannot be manipulated and that updated_at will always be larger than the previous updated_at.';

-- Used for queueing jobs easily; relies on the fact that every table we have
-- has a primary key 'id' column; this won't work if you rename your primary
-- key columns.
create function priv.tg__add_job() returns trigger as $$
begin
  perform graphile_worker.add_job(tg_argv[0], json_build_object('id', NEW.id));
  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;
comment on function priv.tg__add_job() is
  E'Useful shortcut to create a job on insert/update. Pass the task name as the first trigger argument, and optionally the queue name as the second argument. The record id will automatically be available on the JSON payload.';


CREATE OR REPLACE FUNCTION public.to_slug(text)
RETURNS text AS $$
DECLARE
  slug text;
BEGIN
  slug := translate(lower($1), ' ', '-');
  slug := translate(slug, '.', '-');
  slug := translate(slug, '_', '-');
  slug := translate(slug, '/', '-');
  slug := translate(slug, '&', 'and');
  slug := translate(slug, '''', '');
  slug := translate(slug, '"', '');
  RETURN slug;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION publ.generate_slug() RETURNS TRIGGER AS $$
BEGIN
  NEW.slug := to_slug(NEW.name);

  -- Check if the slug already exists in the table
  -- If it does, add a random 4 digit suffix
  -- and check again until a unique slug is found
  WHILE EXISTS (SELECT 1 FROM publ.organizations WHERE slug = NEW.slug) LOOP
    NEW.slug := NEW.slug || ('-' || (random() * 10000)::integer)::text;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;