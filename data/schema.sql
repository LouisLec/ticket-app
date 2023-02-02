--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Homebrew)
-- Dumped by pg_dump version 14.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: priv; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA priv;


--
-- Name: publ; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA publ;


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: jwt; Type: TYPE; Schema: publ; Owner: -
--

CREATE TYPE publ.jwt AS (
	sub uuid,
	exp bigint
);


--
-- Name: tg__add_job(); Type: FUNCTION; Schema: priv; Owner: -
--

CREATE FUNCTION priv.tg__add_job() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
begin
  perform graphile_worker.add_job(tg_argv[0], json_build_object('id', NEW.id));
  return NEW;
end;
$$;


--
-- Name: FUNCTION tg__add_job(); Type: COMMENT; Schema: priv; Owner: -
--

COMMENT ON FUNCTION priv.tg__add_job() IS 'Useful shortcut to create a job on insert/update. Pass the task name as the first trigger argument, and optionally the queue name as the second argument. The record id will automatically be available on the JSON payload.';


--
-- Name: tg__timestamps(); Type: FUNCTION; Schema: priv; Owner: -
--

CREATE FUNCTION priv.tg__timestamps() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
begin
  NEW.created_at = (case when TG_OP = 'INSERT' then NOW() else OLD.created_at end);
  NEW.updated_at = (case when TG_OP = 'UPDATE' and OLD.updated_at >= NOW() then OLD.updated_at + interval '1 millisecond' else NOW() end);
  return NEW;
end;
$$;


--
-- Name: FUNCTION tg__timestamps(); Type: COMMENT; Schema: priv; Owner: -
--

COMMENT ON FUNCTION priv.tg__timestamps() IS 'This trigger should be called on all tables with created_at, updated_at - it ensures that they cannot be manipulated and that updated_at will always be larger than the previous updated_at.';


--
-- Name: tg_user_secrets__insert_with_user(); Type: FUNCTION; Schema: priv; Owner: -
--

CREATE FUNCTION priv.tg_user_secrets__insert_with_user() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
begin
  insert into priv.user_secrets(user_id) values(NEW.id) on conflict do nothing;
  return NEW;
end;

$$;


--
-- Name: FUNCTION tg_user_secrets__insert_with_user(); Type: COMMENT; Schema: priv; Owner: -
--

COMMENT ON FUNCTION priv.tg_user_secrets__insert_with_user() IS 'Ensures that every user record has an associated user_secret record.';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: publ; Owner: -
--

CREATE TABLE publ.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    avatar_url text,
    is_admin boolean DEFAULT false NOT NULL,
    email public.citext NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: current_user(); Type: FUNCTION; Schema: publ; Owner: -
--

CREATE FUNCTION publ."current_user"() RETURNS publ.users
    LANGUAGE sql STABLE
    AS $$
  select users.* from publ.users where id = publ.current_user_id();
$$;


--
-- Name: FUNCTION "current_user"(); Type: COMMENT; Schema: publ; Owner: -
--

COMMENT ON FUNCTION publ."current_user"() IS 'The currently logged in user (or null if not logged in).';


--
-- Name: current_user_id(); Type: FUNCTION; Schema: publ; Owner: -
--

CREATE FUNCTION publ.current_user_id() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
    select nullif(current_setting('jwt.claims.sub', true), '')::uuid;
$$;


--
-- Name: FUNCTION current_user_id(); Type: COMMENT; Schema: publ; Owner: -
--

COMMENT ON FUNCTION publ.current_user_id() IS 'Handy method to get the current user ID.';


--
-- Name: generate_slug(); Type: FUNCTION; Schema: publ; Owner: -
--

CREATE FUNCTION publ.generate_slug() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
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
$$;


--
-- Name: login(public.citext, text); Type: FUNCTION; Schema: publ; Owner: -
--

CREATE FUNCTION publ.login(email public.citext, password text) RETURNS publ.jwt
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$  
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
$$;


--
-- Name: projects; Type: TABLE; Schema: publ; Owner: -
--

CREATE TABLE publ.projects (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL,
    organization_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    initial_context text,
    daily_rate integer DEFAULT 650,
    points_per_day integer DEFAULT 6,
    coeff_luidgy integer DEFAULT 1,
    is_ngo boolean DEFAULT false
);


--
-- Name: project_by_slug(text, text); Type: FUNCTION; Schema: publ; Owner: -
--

CREATE FUNCTION publ.project_by_slug(project_slug text, organization_slug text) RETURNS publ.projects
    LANGUAGE sql STABLE SECURITY DEFINER
    AS $$
  select proj from publ.projects proj
  inner join publ.organizations org on org.id = proj.organization_id
  where proj.slug = project_slug and org.slug = organization_slug
  limit 1;
$$;


--
-- Name: register(public.citext, text, text, text, text); Type: FUNCTION; Schema: publ; Owner: -
--

CREATE FUNCTION publ.register(email public.citext, firstname text, lastname text, password text, avatar_url text DEFAULT NULL::text) RETURNS publ.jwt
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
declare
    v_user_id uuid;
begin
    insert into publ.users (email, firstname, lastname, avatar_url) values (email, firstname, lastname, avatar_url) returning id into v_user_id;
    insert into priv.user_secrets as us (user_id, password_hash) values (v_user_id, crypt(password, gen_salt('bf')))
    on conflict (user_id) do update set password_hash = excluded.password_hash;
    return (v_user_id, extract(epoch from (now() + interval '2 days')))::publ.jwt;

end;
$$;


--
-- Name: update_domain_order(); Type: FUNCTION; Schema: publ; Owner: -
--

CREATE FUNCTION publ.update_domain_order() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
declare
  max_order int;
begin

  if 
    exists (SELECT 1 FROM priv.update_domain_order_log WHERE project_id = NEW.project_id)
  then
      return NEW;
  end if;

  insert into priv.update_domain_order_log (project_id) values (NEW.project_id);

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
  delete from priv.update_domain_order_log where project_id = NEW.project_id;
  return NEW;
end;
$$;


--
-- Name: update_epic_order(); Type: FUNCTION; Schema: publ; Owner: -
--

CREATE FUNCTION publ.update_epic_order() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
declare
  max_order int;
begin


  if 
    exists (SELECT 1 FROM priv.update_epic_order_log WHERE project_id = NEW.project_id)
  then
      return NEW;
  end if;

  insert into priv.update_epic_order_log (project_id) values (NEW.project_id);

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
  delete from priv.update_epic_order_log where project_id = NEW.project_id;
  return NEW;
end;
$$;


--
-- Name: update_task_order(); Type: FUNCTION; Schema: publ; Owner: -
--

CREATE FUNCTION publ.update_task_order() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
declare
  max_order int;
begin

  if 
    exists (SELECT 1 FROM priv.update_task_order_log WHERE user_story_id = NEW.user_story_id)
  then
      return NEW;
  end if;

  insert into priv.update_task_order_log (user_story_id) values (NEW.user_story_id);
  if (TG_OP = 'INSERT') then
    if (NEW."order" is null) then
      -- Get the max "order" value for the organization
      select max("order") INTO max_order
      from publ.tasks
      where user_story_id = NEW.user_story_id;
      if (max_order IS NOT NULL) then
        NEW."order" = max_order + 1;
      ELSE
        NEW."order" = 0;
      END if;
    ELSE  
      -- Shift existing tasks with higher "order" value
      update publ.tasks
      set "order" = "order" + 1
      where user_story_id = NEW.user_story_id
        and "order" >= NEW."order";
    END if;
  elsif (TG_OP = 'UPDATE') then
    if (OLD."order" <> NEW."order") then
      -- Shift existing tasks with higher "order" value
      if (OLD."order" < NEW."order") then
        update publ.tasks
        set "order" = "order" - 1
        where user_story_id = NEW.user_story_id
          and "order" > OLD."order"
          and "order" <= NEW."order";
      else
        update publ.tasks
        set "order" = "order" + 1
        where user_story_id = NEW.user_story_id
          and "order" >= NEW."order"
          and "order" < OLD."order";
      end if;
    end if;
  end if;
  delete from priv.update_task_order_log where user_story_id = NEW.user_story_id;
  return NEW;
end;
$$;


--
-- Name: update_user_story_order(); Type: FUNCTION; Schema: publ; Owner: -
--

CREATE FUNCTION publ.update_user_story_order() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
declare
  max_order int;
begin


  if 
    exists (SELECT 1 FROM priv.update_user_story_order_log WHERE epic_id = NEW.epic_id)
  then
      return NEW;
  end if;

  insert into priv.update_user_story_order_log (epic_id) values (NEW.epic_id);

  if (TG_OP = 'INSERT') then
    if (NEW."order" is null) then
      -- Get the max "order" value for the organization
      select max("order") INTO max_order
      from publ.user_stories
      where epic_id = NEW.epic_id;
      if (max_order IS NOT NULL) then
        NEW."order" = max_order + 1;
      ELSE
        NEW."order" = 0;
      END if;
    ELSE
      -- Shift existing projects with higher "order" value
      update publ.user_stories
      set "order" = "order" + 1
      where epic_id = NEW.epic_id
        and "order" >= NEW."order";
    END if;
  elsif (TG_OP = 'UPDATE') then
    if (OLD."order" <> NEW."order") then
      -- Shift existing projects with higher "order" value
      if (OLD."order" < NEW."order") then
        update publ.user_stories
        set "order" = "order" - 1
        where epic_id = NEW.epic_id
          and "order" > OLD."order"
          and "order" <= NEW."order";
      else
        update publ.user_stories
        set "order" = "order" + 1
        where epic_id = NEW.epic_id
          and "order" >= NEW."order"
          and "order" < OLD."order";
      end if;
    end if;
  end if;

  delete from priv.update_user_story_order_log where epic_id = NEW.epic_id;

  return NEW;
end;
$$;


--
-- Name: users_has_password(publ.users); Type: FUNCTION; Schema: publ; Owner: -
--

CREATE FUNCTION publ.users_has_password(u publ.users) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
  select (password_hash is not null) from priv.user_secrets where user_secrets.user_id = u.id and u.id = publ.current_user_id();
$$;


--
-- Name: to_slug(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.to_slug(text) RETURNS text
    LANGUAGE plpgsql
    AS $_$
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
$_$;


--
-- Name: update_domain_order_log; Type: TABLE; Schema: priv; Owner: -
--

CREATE TABLE priv.update_domain_order_log (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    project_id uuid NOT NULL
);


--
-- Name: update_epic_order_log; Type: TABLE; Schema: priv; Owner: -
--

CREATE TABLE priv.update_epic_order_log (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    project_id uuid NOT NULL
);


--
-- Name: update_task_order_log; Type: TABLE; Schema: priv; Owner: -
--

CREATE TABLE priv.update_task_order_log (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_story_id uuid NOT NULL
);


--
-- Name: update_user_story_order_log; Type: TABLE; Schema: priv; Owner: -
--

CREATE TABLE priv.update_user_story_order_log (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    epic_id uuid NOT NULL
);


--
-- Name: user_secrets; Type: TABLE; Schema: priv; Owner: -
--

CREATE TABLE priv.user_secrets (
    user_id uuid NOT NULL,
    password_hash text,
    last_login_at timestamp with time zone DEFAULT now() NOT NULL,
    failed_password_attempts integer DEFAULT 0 NOT NULL,
    first_failed_password_attempt timestamp with time zone,
    reset_password_token text,
    reset_password_token_generated timestamp with time zone,
    failed_reset_password_attempts integer DEFAULT 0 NOT NULL,
    first_failed_reset_password_attempt timestamp with time zone,
    delete_account_token text,
    delete_account_token_generated timestamp with time zone
);


--
-- Name: domains; Type: TABLE; Schema: publ; Owner: -
--

CREATE TABLE publ.domains (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    short_name text NOT NULL,
    "order" integer,
    description text,
    project_id uuid NOT NULL,
    color text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: epics; Type: TABLE; Schema: publ; Owner: -
--

CREATE TABLE publ.epics (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    "order" integer,
    description text NOT NULL,
    icon text,
    project_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: organization_memberships; Type: TABLE; Schema: publ; Owner: -
--

CREATE TABLE publ.organization_memberships (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    organization_id uuid NOT NULL,
    user_id uuid NOT NULL,
    role text DEFAULT 'GUEST'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: organization_memberships_roles_enum; Type: TABLE; Schema: publ; Owner: -
--

CREATE TABLE publ.organization_memberships_roles_enum (
    type text NOT NULL,
    description text
);


--
-- Name: TABLE organization_memberships_roles_enum; Type: COMMENT; Schema: publ; Owner: -
--

COMMENT ON TABLE publ.organization_memberships_roles_enum IS '@enum';


--
-- Name: organizations; Type: TABLE; Schema: publ; Owner: -
--

CREATE TABLE publ.organizations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL,
    logo_url text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: personas; Type: TABLE; Schema: publ; Owner: -
--

CREATE TABLE publ.personas (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    short_name text NOT NULL,
    description text NOT NULL,
    project_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: task_status; Type: TABLE; Schema: publ; Owner: -
--

CREATE TABLE publ.task_status (
    type text NOT NULL,
    description text
);


--
-- Name: TABLE task_status; Type: COMMENT; Schema: publ; Owner: -
--

COMMENT ON TABLE publ.task_status IS '@enum';


--
-- Name: tasks; Type: TABLE; Schema: publ; Owner: -
--

CREATE TABLE publ.tasks (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "order" integer,
    user_story_id uuid NOT NULL,
    domain_id uuid,
    status text DEFAULT 'BACKLOG'::text,
    estimate integer NOT NULL,
    parent_id uuid,
    uncertainty integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_stories; Type: TABLE; Schema: publ; Owner: -
--

CREATE TABLE publ.user_stories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text,
    "order" integer,
    as_a uuid,
    i_want text NOT NULL,
    so_that text,
    epic_id uuid,
    validation_criteria text,
    comments text,
    variables text,
    parent_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    rough_estimate integer
);


--
-- Name: update_domain_order_log update_domain_order_log_pkey; Type: CONSTRAINT; Schema: priv; Owner: -
--

ALTER TABLE ONLY priv.update_domain_order_log
    ADD CONSTRAINT update_domain_order_log_pkey PRIMARY KEY (id);


--
-- Name: update_epic_order_log update_epic_order_log_pkey; Type: CONSTRAINT; Schema: priv; Owner: -
--

ALTER TABLE ONLY priv.update_epic_order_log
    ADD CONSTRAINT update_epic_order_log_pkey PRIMARY KEY (id);


--
-- Name: update_task_order_log update_task_order_log_pkey; Type: CONSTRAINT; Schema: priv; Owner: -
--

ALTER TABLE ONLY priv.update_task_order_log
    ADD CONSTRAINT update_task_order_log_pkey PRIMARY KEY (id);


--
-- Name: update_user_story_order_log update_user_story_order_log_pkey; Type: CONSTRAINT; Schema: priv; Owner: -
--

ALTER TABLE ONLY priv.update_user_story_order_log
    ADD CONSTRAINT update_user_story_order_log_pkey PRIMARY KEY (id);


--
-- Name: user_secrets user_secrets_pkey; Type: CONSTRAINT; Schema: priv; Owner: -
--

ALTER TABLE ONLY priv.user_secrets
    ADD CONSTRAINT user_secrets_pkey PRIMARY KEY (user_id);


--
-- Name: domains domains_pkey; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.domains
    ADD CONSTRAINT domains_pkey PRIMARY KEY (id);


--
-- Name: epics epics_pkey; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.epics
    ADD CONSTRAINT epics_pkey PRIMARY KEY (id);


--
-- Name: organization_memberships organization_memberships_organization_id_user_id_key; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.organization_memberships
    ADD CONSTRAINT organization_memberships_organization_id_user_id_key UNIQUE (organization_id, user_id);


--
-- Name: organization_memberships organization_memberships_pkey; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.organization_memberships
    ADD CONSTRAINT organization_memberships_pkey PRIMARY KEY (id);


--
-- Name: organization_memberships_roles_enum organization_memberships_roles_enum_pkey; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.organization_memberships_roles_enum
    ADD CONSTRAINT organization_memberships_roles_enum_pkey PRIMARY KEY (type);


--
-- Name: organizations organizations_name_key; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.organizations
    ADD CONSTRAINT organizations_name_key UNIQUE (name);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_slug_key; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.organizations
    ADD CONSTRAINT organizations_slug_key UNIQUE (slug);


--
-- Name: personas personas_pkey; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.personas
    ADD CONSTRAINT personas_pkey PRIMARY KEY (id);


--
-- Name: projects projects_organization_id_name_key; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.projects
    ADD CONSTRAINT projects_organization_id_name_key UNIQUE (organization_id, name);


--
-- Name: projects projects_organization_id_slug_key; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.projects
    ADD CONSTRAINT projects_organization_id_slug_key UNIQUE (organization_id, slug);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: task_status task_status_pkey; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.task_status
    ADD CONSTRAINT task_status_pkey PRIMARY KEY (type);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: user_stories user_stories_pkey; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.user_stories
    ADD CONSTRAINT user_stories_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: domains_created_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX domains_created_at_idx ON publ.domains USING btree (created_at);


--
-- Name: domains_name_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX domains_name_idx ON publ.domains USING btree (name);


--
-- Name: domains_order_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX domains_order_idx ON publ.domains USING btree ("order");


--
-- Name: domains_project_id_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX domains_project_id_idx ON publ.domains USING btree (project_id);


--
-- Name: domains_updated_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX domains_updated_at_idx ON publ.domains USING btree (updated_at);


--
-- Name: epics_created_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX epics_created_at_idx ON publ.epics USING btree (created_at);


--
-- Name: epics_name_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX epics_name_idx ON publ.epics USING btree (name);


--
-- Name: epics_order_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX epics_order_idx ON publ.epics USING btree ("order");


--
-- Name: epics_project_id_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX epics_project_id_idx ON publ.epics USING btree (project_id);


--
-- Name: epics_updated_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX epics_updated_at_idx ON publ.epics USING btree (updated_at);


--
-- Name: organization_memberships_created_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX organization_memberships_created_at_idx ON publ.organization_memberships USING btree (created_at);


--
-- Name: organization_memberships_organization_id_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX organization_memberships_organization_id_idx ON publ.organization_memberships USING btree (organization_id);


--
-- Name: organization_memberships_role_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX organization_memberships_role_idx ON publ.organization_memberships USING btree (role);


--
-- Name: organization_memberships_updated_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX organization_memberships_updated_at_idx ON publ.organization_memberships USING btree (updated_at);


--
-- Name: organization_memberships_user_id_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX organization_memberships_user_id_idx ON publ.organization_memberships USING btree (user_id);


--
-- Name: organizations_created_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX organizations_created_at_idx ON publ.organizations USING btree (created_at);


--
-- Name: organizations_name_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX organizations_name_idx ON publ.organizations USING btree (name);


--
-- Name: organizations_slug_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX organizations_slug_idx ON publ.organizations USING btree (slug);


--
-- Name: organizations_updated_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX organizations_updated_at_idx ON publ.organizations USING btree (updated_at);


--
-- Name: personas_created_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX personas_created_at_idx ON publ.personas USING btree (created_at);


--
-- Name: personas_name_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX personas_name_idx ON publ.personas USING btree (name);


--
-- Name: personas_project_id_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX personas_project_id_idx ON publ.personas USING btree (project_id);


--
-- Name: personas_updated_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX personas_updated_at_idx ON publ.personas USING btree (updated_at);


--
-- Name: projects_created_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX projects_created_at_idx ON publ.projects USING btree (created_at);


--
-- Name: projects_name_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX projects_name_idx ON publ.projects USING btree (name);


--
-- Name: projects_organization_id_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX projects_organization_id_idx ON publ.projects USING btree (organization_id);


--
-- Name: projects_slug_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX projects_slug_idx ON publ.projects USING btree (slug);


--
-- Name: projects_updated_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX projects_updated_at_idx ON publ.projects USING btree (updated_at);


--
-- Name: tasks_created_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX tasks_created_at_idx ON publ.tasks USING btree (created_at);


--
-- Name: tasks_domain_id_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX tasks_domain_id_idx ON publ.tasks USING btree (domain_id);


--
-- Name: tasks_estimate_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX tasks_estimate_idx ON publ.tasks USING btree (estimate);


--
-- Name: tasks_name_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX tasks_name_idx ON publ.tasks USING btree (name);


--
-- Name: tasks_order_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX tasks_order_idx ON publ.tasks USING btree ("order");


--
-- Name: tasks_parent_id_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX tasks_parent_id_idx ON publ.tasks USING btree (parent_id);


--
-- Name: tasks_status_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX tasks_status_idx ON publ.tasks USING btree (status);


--
-- Name: tasks_uncertainty_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX tasks_uncertainty_idx ON publ.tasks USING btree (uncertainty);


--
-- Name: tasks_updated_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX tasks_updated_at_idx ON publ.tasks USING btree (updated_at);


--
-- Name: tasks_user_story_id_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX tasks_user_story_id_idx ON publ.tasks USING btree (user_story_id);


--
-- Name: user_stories_as_a_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX user_stories_as_a_idx ON publ.user_stories USING btree (as_a);


--
-- Name: user_stories_created_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX user_stories_created_at_idx ON publ.user_stories USING btree (created_at);


--
-- Name: user_stories_epic_id_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX user_stories_epic_id_idx ON publ.user_stories USING btree (epic_id);


--
-- Name: user_stories_order_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX user_stories_order_idx ON publ.user_stories USING btree ("order");


--
-- Name: user_stories_parent_id_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX user_stories_parent_id_idx ON publ.user_stories USING btree (parent_id);


--
-- Name: user_stories_updated_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX user_stories_updated_at_idx ON publ.user_stories USING btree (updated_at);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX users_created_at_idx ON publ.users USING btree (created_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX users_email_idx ON publ.users USING btree (email);


--
-- Name: users_updated_at_idx; Type: INDEX; Schema: publ; Owner: -
--

CREATE INDEX users_updated_at_idx ON publ.users USING btree (updated_at);


--
-- Name: domains _100_timestamps; Type: TRIGGER; Schema: publ; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON publ.domains FOR EACH ROW EXECUTE FUNCTION priv.tg__timestamps();


--
-- Name: epics _100_timestamps; Type: TRIGGER; Schema: publ; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON publ.epics FOR EACH ROW EXECUTE FUNCTION priv.tg__timestamps();


--
-- Name: organization_memberships _100_timestamps; Type: TRIGGER; Schema: publ; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON publ.organization_memberships FOR EACH ROW EXECUTE FUNCTION priv.tg__timestamps();


--
-- Name: organizations _100_timestamps; Type: TRIGGER; Schema: publ; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON publ.organizations FOR EACH ROW EXECUTE FUNCTION priv.tg__timestamps();


--
-- Name: personas _100_timestamps; Type: TRIGGER; Schema: publ; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON publ.personas FOR EACH ROW EXECUTE FUNCTION priv.tg__timestamps();


--
-- Name: projects _100_timestamps; Type: TRIGGER; Schema: publ; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON publ.projects FOR EACH ROW EXECUTE FUNCTION priv.tg__timestamps();


--
-- Name: tasks _100_timestamps; Type: TRIGGER; Schema: publ; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON publ.tasks FOR EACH ROW EXECUTE FUNCTION priv.tg__timestamps();


--
-- Name: user_stories _100_timestamps; Type: TRIGGER; Schema: publ; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON publ.user_stories FOR EACH ROW EXECUTE FUNCTION priv.tg__timestamps();


--
-- Name: users _100_timestamps; Type: TRIGGER; Schema: publ; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON publ.users FOR EACH ROW EXECUTE FUNCTION priv.tg__timestamps();


--
-- Name: domains _100_update_domain_order; Type: TRIGGER; Schema: publ; Owner: -
--

CREATE TRIGGER _100_update_domain_order BEFORE INSERT OR UPDATE ON publ.domains FOR EACH ROW EXECUTE FUNCTION publ.update_domain_order();


--
-- Name: epics _100_update_epic_order; Type: TRIGGER; Schema: publ; Owner: -
--

CREATE TRIGGER _100_update_epic_order BEFORE INSERT OR UPDATE ON publ.epics FOR EACH ROW EXECUTE FUNCTION publ.update_epic_order();


--
-- Name: user_stories _100_update_user_story_order; Type: TRIGGER; Schema: publ; Owner: -
--

CREATE TRIGGER _100_update_user_story_order BEFORE INSERT OR UPDATE ON publ.user_stories FOR EACH ROW EXECUTE FUNCTION publ.update_user_story_order();


--
-- Name: users _500_insert_secrets; Type: TRIGGER; Schema: publ; Owner: -
--

CREATE TRIGGER _500_insert_secrets AFTER INSERT ON publ.users FOR EACH ROW EXECUTE FUNCTION priv.tg_user_secrets__insert_with_user();


--
-- Name: projects _700_generate_slug_trigger; Type: TRIGGER; Schema: publ; Owner: -
--

CREATE TRIGGER _700_generate_slug_trigger BEFORE INSERT OR UPDATE ON publ.projects FOR EACH ROW EXECUTE FUNCTION publ.generate_slug();


--
-- Name: organizations generate_slug_trigger; Type: TRIGGER; Schema: publ; Owner: -
--

CREATE TRIGGER generate_slug_trigger BEFORE INSERT OR UPDATE ON publ.organizations FOR EACH ROW EXECUTE FUNCTION publ.generate_slug();


--
-- Name: tasks update_task_order; Type: TRIGGER; Schema: publ; Owner: -
--

CREATE TRIGGER update_task_order BEFORE INSERT OR UPDATE ON publ.tasks FOR EACH ROW EXECUTE FUNCTION publ.update_task_order();


--
-- Name: update_domain_order_log update_domain_order_log_project_id_fkey; Type: FK CONSTRAINT; Schema: priv; Owner: -
--

ALTER TABLE ONLY priv.update_domain_order_log
    ADD CONSTRAINT update_domain_order_log_project_id_fkey FOREIGN KEY (project_id) REFERENCES publ.projects(id) ON DELETE CASCADE;


--
-- Name: update_epic_order_log update_epic_order_log_project_id_fkey; Type: FK CONSTRAINT; Schema: priv; Owner: -
--

ALTER TABLE ONLY priv.update_epic_order_log
    ADD CONSTRAINT update_epic_order_log_project_id_fkey FOREIGN KEY (project_id) REFERENCES publ.projects(id) ON DELETE CASCADE;


--
-- Name: update_task_order_log update_task_order_log_user_story_id_fkey; Type: FK CONSTRAINT; Schema: priv; Owner: -
--

ALTER TABLE ONLY priv.update_task_order_log
    ADD CONSTRAINT update_task_order_log_user_story_id_fkey FOREIGN KEY (user_story_id) REFERENCES publ.user_stories(id) ON DELETE CASCADE;


--
-- Name: update_user_story_order_log update_user_story_order_log_epic_id_fkey; Type: FK CONSTRAINT; Schema: priv; Owner: -
--

ALTER TABLE ONLY priv.update_user_story_order_log
    ADD CONSTRAINT update_user_story_order_log_epic_id_fkey FOREIGN KEY (epic_id) REFERENCES publ.epics(id) ON DELETE CASCADE;


--
-- Name: user_secrets user_secrets_user_id_fkey; Type: FK CONSTRAINT; Schema: priv; Owner: -
--

ALTER TABLE ONLY priv.user_secrets
    ADD CONSTRAINT user_secrets_user_id_fkey FOREIGN KEY (user_id) REFERENCES publ.users(id) ON DELETE CASCADE;


--
-- Name: domains domains_project_id_fkey; Type: FK CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.domains
    ADD CONSTRAINT domains_project_id_fkey FOREIGN KEY (project_id) REFERENCES publ.projects(id) ON DELETE CASCADE;


--
-- Name: epics epics_project_id_fkey; Type: FK CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.epics
    ADD CONSTRAINT epics_project_id_fkey FOREIGN KEY (project_id) REFERENCES publ.projects(id) ON DELETE CASCADE;


--
-- Name: organization_memberships organization_memberships_organization_id_fkey; Type: FK CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.organization_memberships
    ADD CONSTRAINT organization_memberships_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES publ.organizations(id) ON DELETE CASCADE;


--
-- Name: organization_memberships organization_memberships_role_fkey; Type: FK CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.organization_memberships
    ADD CONSTRAINT organization_memberships_role_fkey FOREIGN KEY (role) REFERENCES publ.organization_memberships_roles_enum(type) ON DELETE CASCADE;


--
-- Name: organization_memberships organization_memberships_user_id_fkey; Type: FK CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.organization_memberships
    ADD CONSTRAINT organization_memberships_user_id_fkey FOREIGN KEY (user_id) REFERENCES publ.users(id) ON DELETE CASCADE;


--
-- Name: personas personas_project_id_fkey; Type: FK CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.personas
    ADD CONSTRAINT personas_project_id_fkey FOREIGN KEY (project_id) REFERENCES publ.projects(id) ON DELETE CASCADE;


--
-- Name: projects projects_organization_id_fkey; Type: FK CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.projects
    ADD CONSTRAINT projects_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES publ.organizations(id) ON DELETE CASCADE;


--
-- Name: tasks tasks_domain_id_fkey; Type: FK CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.tasks
    ADD CONSTRAINT tasks_domain_id_fkey FOREIGN KEY (domain_id) REFERENCES publ.domains(id) ON DELETE RESTRICT;


--
-- Name: tasks tasks_parent_id_fkey; Type: FK CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.tasks
    ADD CONSTRAINT tasks_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES publ.tasks(id) ON DELETE RESTRICT;


--
-- Name: tasks tasks_status_fkey; Type: FK CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.tasks
    ADD CONSTRAINT tasks_status_fkey FOREIGN KEY (status) REFERENCES publ.task_status(type) ON DELETE RESTRICT;


--
-- Name: tasks tasks_user_story_id_fkey; Type: FK CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.tasks
    ADD CONSTRAINT tasks_user_story_id_fkey FOREIGN KEY (user_story_id) REFERENCES publ.user_stories(id) ON DELETE CASCADE;


--
-- Name: user_stories user_stories_as_a_fkey; Type: FK CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.user_stories
    ADD CONSTRAINT user_stories_as_a_fkey FOREIGN KEY (as_a) REFERENCES publ.personas(id) ON DELETE RESTRICT;


--
-- Name: user_stories user_stories_epic_id_fkey; Type: FK CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.user_stories
    ADD CONSTRAINT user_stories_epic_id_fkey FOREIGN KEY (epic_id) REFERENCES publ.epics(id) ON DELETE RESTRICT;


--
-- Name: user_stories user_stories_parent_id_fkey; Type: FK CONSTRAINT; Schema: publ; Owner: -
--

ALTER TABLE ONLY publ.user_stories
    ADD CONSTRAINT user_stories_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES publ.user_stories(id) ON DELETE RESTRICT;


--
-- Name: user_secrets; Type: ROW SECURITY; Schema: priv; Owner: -
--

ALTER TABLE priv.user_secrets ENABLE ROW LEVEL SECURITY;

--
-- Name: domains; Type: ROW SECURITY; Schema: publ; Owner: -
--

ALTER TABLE publ.domains ENABLE ROW LEVEL SECURITY;

--
-- Name: epics; Type: ROW SECURITY; Schema: publ; Owner: -
--

ALTER TABLE publ.epics ENABLE ROW LEVEL SECURITY;

--
-- Name: domains no_limit; Type: POLICY; Schema: publ; Owner: -
--

CREATE POLICY no_limit ON publ.domains USING (true) WITH CHECK (true);


--
-- Name: epics no_limit; Type: POLICY; Schema: publ; Owner: -
--

CREATE POLICY no_limit ON publ.epics USING (true) WITH CHECK (true);


--
-- Name: organization_memberships no_limit; Type: POLICY; Schema: publ; Owner: -
--

CREATE POLICY no_limit ON publ.organization_memberships USING (true) WITH CHECK (true);


--
-- Name: organizations no_limit; Type: POLICY; Schema: publ; Owner: -
--

CREATE POLICY no_limit ON publ.organizations USING (true) WITH CHECK (true);


--
-- Name: personas no_limit; Type: POLICY; Schema: publ; Owner: -
--

CREATE POLICY no_limit ON publ.personas USING (true) WITH CHECK (true);


--
-- Name: projects no_limit; Type: POLICY; Schema: publ; Owner: -
--

CREATE POLICY no_limit ON publ.projects USING (true) WITH CHECK (true);


--
-- Name: tasks no_limit; Type: POLICY; Schema: publ; Owner: -
--

CREATE POLICY no_limit ON publ.tasks USING (true) WITH CHECK (true);


--
-- Name: user_stories no_limit; Type: POLICY; Schema: publ; Owner: -
--

CREATE POLICY no_limit ON publ.user_stories USING (true) WITH CHECK (true);


--
-- Name: users no_limit; Type: POLICY; Schema: publ; Owner: -
--

CREATE POLICY no_limit ON publ.users USING (true) WITH CHECK (true);


--
-- Name: organization_memberships; Type: ROW SECURITY; Schema: publ; Owner: -
--

ALTER TABLE publ.organization_memberships ENABLE ROW LEVEL SECURITY;

--
-- Name: organizations; Type: ROW SECURITY; Schema: publ; Owner: -
--

ALTER TABLE publ.organizations ENABLE ROW LEVEL SECURITY;

--
-- Name: personas; Type: ROW SECURITY; Schema: publ; Owner: -
--

ALTER TABLE publ.personas ENABLE ROW LEVEL SECURITY;

--
-- Name: projects; Type: ROW SECURITY; Schema: publ; Owner: -
--

ALTER TABLE publ.projects ENABLE ROW LEVEL SECURITY;

--
-- Name: tasks; Type: ROW SECURITY; Schema: publ; Owner: -
--

ALTER TABLE publ.tasks ENABLE ROW LEVEL SECURITY;

--
-- Name: user_stories; Type: ROW SECURITY; Schema: publ; Owner: -
--

ALTER TABLE publ.user_stories ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: publ; Owner: -
--

ALTER TABLE publ.users ENABLE ROW LEVEL SECURITY;

--
-- Name: SCHEMA publ; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA publ TO ticket_app_visitor;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM louislec;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO ticket_app_owner;
GRANT USAGE ON SCHEMA public TO ticket_app_visitor;


--
-- Name: FUNCTION tg__add_job(); Type: ACL; Schema: priv; Owner: -
--

REVOKE ALL ON FUNCTION priv.tg__add_job() FROM PUBLIC;


--
-- Name: FUNCTION tg__timestamps(); Type: ACL; Schema: priv; Owner: -
--

REVOKE ALL ON FUNCTION priv.tg__timestamps() FROM PUBLIC;


--
-- Name: FUNCTION tg_user_secrets__insert_with_user(); Type: ACL; Schema: priv; Owner: -
--

REVOKE ALL ON FUNCTION priv.tg_user_secrets__insert_with_user() FROM PUBLIC;


--
-- Name: TABLE users; Type: ACL; Schema: publ; Owner: -
--

GRANT SELECT,DELETE ON TABLE publ.users TO ticket_app_visitor;


--
-- Name: COLUMN users.firstname; Type: ACL; Schema: publ; Owner: -
--

GRANT UPDATE(firstname) ON TABLE publ.users TO ticket_app_visitor;


--
-- Name: COLUMN users.lastname; Type: ACL; Schema: publ; Owner: -
--

GRANT UPDATE(lastname) ON TABLE publ.users TO ticket_app_visitor;


--
-- Name: COLUMN users.avatar_url; Type: ACL; Schema: publ; Owner: -
--

GRANT UPDATE(avatar_url) ON TABLE publ.users TO ticket_app_visitor;


--
-- Name: COLUMN users.email; Type: ACL; Schema: publ; Owner: -
--

GRANT UPDATE(email) ON TABLE publ.users TO ticket_app_visitor;


--
-- Name: FUNCTION "current_user"(); Type: ACL; Schema: publ; Owner: -
--

REVOKE ALL ON FUNCTION publ."current_user"() FROM PUBLIC;
GRANT ALL ON FUNCTION publ."current_user"() TO ticket_app_visitor;


--
-- Name: FUNCTION current_user_id(); Type: ACL; Schema: publ; Owner: -
--

REVOKE ALL ON FUNCTION publ.current_user_id() FROM PUBLIC;
GRANT ALL ON FUNCTION publ.current_user_id() TO ticket_app_visitor;


--
-- Name: FUNCTION generate_slug(); Type: ACL; Schema: publ; Owner: -
--

REVOKE ALL ON FUNCTION publ.generate_slug() FROM PUBLIC;
GRANT ALL ON FUNCTION publ.generate_slug() TO ticket_app_visitor;


--
-- Name: FUNCTION login(email public.citext, password text); Type: ACL; Schema: publ; Owner: -
--

REVOKE ALL ON FUNCTION publ.login(email public.citext, password text) FROM PUBLIC;
GRANT ALL ON FUNCTION publ.login(email public.citext, password text) TO ticket_app_visitor;


--
-- Name: TABLE projects; Type: ACL; Schema: publ; Owner: -
--

GRANT SELECT,DELETE ON TABLE publ.projects TO ticket_app_visitor;


--
-- Name: COLUMN projects.name; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(name),UPDATE(name) ON TABLE publ.projects TO ticket_app_visitor;


--
-- Name: COLUMN projects.description; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(description),UPDATE(description) ON TABLE publ.projects TO ticket_app_visitor;


--
-- Name: COLUMN projects.organization_id; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(organization_id) ON TABLE publ.projects TO ticket_app_visitor;


--
-- Name: COLUMN projects.initial_context; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(initial_context),UPDATE(initial_context) ON TABLE publ.projects TO ticket_app_visitor;


--
-- Name: COLUMN projects.daily_rate; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(daily_rate),UPDATE(daily_rate) ON TABLE publ.projects TO ticket_app_visitor;


--
-- Name: COLUMN projects.points_per_day; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(points_per_day),UPDATE(points_per_day) ON TABLE publ.projects TO ticket_app_visitor;


--
-- Name: COLUMN projects.coeff_luidgy; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(coeff_luidgy),UPDATE(coeff_luidgy) ON TABLE publ.projects TO ticket_app_visitor;


--
-- Name: COLUMN projects.is_ngo; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(is_ngo),UPDATE(is_ngo) ON TABLE publ.projects TO ticket_app_visitor;


--
-- Name: FUNCTION project_by_slug(project_slug text, organization_slug text); Type: ACL; Schema: publ; Owner: -
--

REVOKE ALL ON FUNCTION publ.project_by_slug(project_slug text, organization_slug text) FROM PUBLIC;
GRANT ALL ON FUNCTION publ.project_by_slug(project_slug text, organization_slug text) TO ticket_app_visitor;


--
-- Name: FUNCTION register(email public.citext, firstname text, lastname text, password text, avatar_url text); Type: ACL; Schema: publ; Owner: -
--

REVOKE ALL ON FUNCTION publ.register(email public.citext, firstname text, lastname text, password text, avatar_url text) FROM PUBLIC;
GRANT ALL ON FUNCTION publ.register(email public.citext, firstname text, lastname text, password text, avatar_url text) TO ticket_app_visitor;


--
-- Name: FUNCTION update_domain_order(); Type: ACL; Schema: publ; Owner: -
--

REVOKE ALL ON FUNCTION publ.update_domain_order() FROM PUBLIC;
GRANT ALL ON FUNCTION publ.update_domain_order() TO ticket_app_visitor;


--
-- Name: FUNCTION update_epic_order(); Type: ACL; Schema: publ; Owner: -
--

REVOKE ALL ON FUNCTION publ.update_epic_order() FROM PUBLIC;
GRANT ALL ON FUNCTION publ.update_epic_order() TO ticket_app_visitor;


--
-- Name: FUNCTION update_task_order(); Type: ACL; Schema: publ; Owner: -
--

REVOKE ALL ON FUNCTION publ.update_task_order() FROM PUBLIC;
GRANT ALL ON FUNCTION publ.update_task_order() TO ticket_app_visitor;


--
-- Name: FUNCTION update_user_story_order(); Type: ACL; Schema: publ; Owner: -
--

REVOKE ALL ON FUNCTION publ.update_user_story_order() FROM PUBLIC;
GRANT ALL ON FUNCTION publ.update_user_story_order() TO ticket_app_visitor;


--
-- Name: FUNCTION users_has_password(u publ.users); Type: ACL; Schema: publ; Owner: -
--

REVOKE ALL ON FUNCTION publ.users_has_password(u publ.users) FROM PUBLIC;
GRANT ALL ON FUNCTION publ.users_has_password(u publ.users) TO ticket_app_visitor;


--
-- Name: FUNCTION to_slug(text); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.to_slug(text) FROM PUBLIC;
GRANT ALL ON FUNCTION public.to_slug(text) TO ticket_app_visitor;


--
-- Name: TABLE user_secrets; Type: ACL; Schema: priv; Owner: -
--

GRANT SELECT ON TABLE priv.user_secrets TO ticket_app_visitor;


--
-- Name: TABLE domains; Type: ACL; Schema: publ; Owner: -
--

GRANT SELECT,DELETE ON TABLE publ.domains TO ticket_app_visitor;


--
-- Name: COLUMN domains.name; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(name),UPDATE(name) ON TABLE publ.domains TO ticket_app_visitor;


--
-- Name: COLUMN domains.short_name; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(short_name),UPDATE(short_name) ON TABLE publ.domains TO ticket_app_visitor;


--
-- Name: COLUMN domains."order"; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT("order"),UPDATE("order") ON TABLE publ.domains TO ticket_app_visitor;


--
-- Name: COLUMN domains.description; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(description),UPDATE(description) ON TABLE publ.domains TO ticket_app_visitor;


--
-- Name: COLUMN domains.project_id; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(project_id) ON TABLE publ.domains TO ticket_app_visitor;


--
-- Name: COLUMN domains.color; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(color),UPDATE(color) ON TABLE publ.domains TO ticket_app_visitor;


--
-- Name: TABLE epics; Type: ACL; Schema: publ; Owner: -
--

GRANT SELECT ON TABLE publ.epics TO ticket_app_visitor;


--
-- Name: COLUMN epics.name; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(name),UPDATE(name) ON TABLE publ.epics TO ticket_app_visitor;


--
-- Name: COLUMN epics."order"; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT("order"),UPDATE("order") ON TABLE publ.epics TO ticket_app_visitor;


--
-- Name: COLUMN epics.description; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(description),UPDATE(description) ON TABLE publ.epics TO ticket_app_visitor;


--
-- Name: COLUMN epics.icon; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(icon),UPDATE(icon) ON TABLE publ.epics TO ticket_app_visitor;


--
-- Name: COLUMN epics.project_id; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(project_id) ON TABLE publ.epics TO ticket_app_visitor;


--
-- Name: TABLE organization_memberships; Type: ACL; Schema: publ; Owner: -
--

GRANT SELECT,DELETE ON TABLE publ.organization_memberships TO ticket_app_visitor;


--
-- Name: COLUMN organization_memberships.organization_id; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(organization_id) ON TABLE publ.organization_memberships TO ticket_app_visitor;


--
-- Name: COLUMN organization_memberships.user_id; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(user_id) ON TABLE publ.organization_memberships TO ticket_app_visitor;


--
-- Name: COLUMN organization_memberships.role; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(role),UPDATE(role) ON TABLE publ.organization_memberships TO ticket_app_visitor;


--
-- Name: TABLE organizations; Type: ACL; Schema: publ; Owner: -
--

GRANT SELECT ON TABLE publ.organizations TO ticket_app_visitor;


--
-- Name: COLUMN organizations.name; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(name),UPDATE(name) ON TABLE publ.organizations TO ticket_app_visitor;


--
-- Name: COLUMN organizations.description; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(description),UPDATE(description) ON TABLE publ.organizations TO ticket_app_visitor;


--
-- Name: COLUMN organizations.logo_url; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(logo_url),UPDATE(logo_url) ON TABLE publ.organizations TO ticket_app_visitor;


--
-- Name: TABLE personas; Type: ACL; Schema: publ; Owner: -
--

GRANT SELECT,DELETE ON TABLE publ.personas TO ticket_app_visitor;


--
-- Name: COLUMN personas.name; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(name),UPDATE(name) ON TABLE publ.personas TO ticket_app_visitor;


--
-- Name: COLUMN personas.short_name; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(short_name),UPDATE(short_name) ON TABLE publ.personas TO ticket_app_visitor;


--
-- Name: COLUMN personas.description; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(description),UPDATE(description) ON TABLE publ.personas TO ticket_app_visitor;


--
-- Name: COLUMN personas.project_id; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(project_id) ON TABLE publ.personas TO ticket_app_visitor;


--
-- Name: TABLE tasks; Type: ACL; Schema: publ; Owner: -
--

GRANT SELECT,DELETE ON TABLE publ.tasks TO ticket_app_visitor;


--
-- Name: COLUMN tasks.name; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(name),UPDATE(name) ON TABLE publ.tasks TO ticket_app_visitor;


--
-- Name: COLUMN tasks.description; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(description),UPDATE(description) ON TABLE publ.tasks TO ticket_app_visitor;


--
-- Name: COLUMN tasks."order"; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT("order"),UPDATE("order") ON TABLE publ.tasks TO ticket_app_visitor;


--
-- Name: COLUMN tasks.user_story_id; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(user_story_id),UPDATE(user_story_id) ON TABLE publ.tasks TO ticket_app_visitor;


--
-- Name: COLUMN tasks.domain_id; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(domain_id),UPDATE(domain_id) ON TABLE publ.tasks TO ticket_app_visitor;


--
-- Name: COLUMN tasks.status; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(status),UPDATE(status) ON TABLE publ.tasks TO ticket_app_visitor;


--
-- Name: COLUMN tasks.estimate; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(estimate),UPDATE(estimate) ON TABLE publ.tasks TO ticket_app_visitor;


--
-- Name: COLUMN tasks.parent_id; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(parent_id),UPDATE(parent_id) ON TABLE publ.tasks TO ticket_app_visitor;


--
-- Name: COLUMN tasks.uncertainty; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(uncertainty),UPDATE(uncertainty) ON TABLE publ.tasks TO ticket_app_visitor;


--
-- Name: TABLE user_stories; Type: ACL; Schema: publ; Owner: -
--

GRANT SELECT,DELETE ON TABLE publ.user_stories TO ticket_app_visitor;


--
-- Name: COLUMN user_stories.name; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(name),UPDATE(name) ON TABLE publ.user_stories TO ticket_app_visitor;


--
-- Name: COLUMN user_stories."order"; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT("order"),UPDATE("order") ON TABLE publ.user_stories TO ticket_app_visitor;


--
-- Name: COLUMN user_stories.as_a; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(as_a),UPDATE(as_a) ON TABLE publ.user_stories TO ticket_app_visitor;


--
-- Name: COLUMN user_stories.i_want; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(i_want),UPDATE(i_want) ON TABLE publ.user_stories TO ticket_app_visitor;


--
-- Name: COLUMN user_stories.so_that; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(so_that),UPDATE(so_that) ON TABLE publ.user_stories TO ticket_app_visitor;


--
-- Name: COLUMN user_stories.epic_id; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(epic_id),UPDATE(epic_id) ON TABLE publ.user_stories TO ticket_app_visitor;


--
-- Name: COLUMN user_stories.validation_criteria; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(validation_criteria),UPDATE(validation_criteria) ON TABLE publ.user_stories TO ticket_app_visitor;


--
-- Name: COLUMN user_stories.comments; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(comments),UPDATE(comments) ON TABLE publ.user_stories TO ticket_app_visitor;


--
-- Name: COLUMN user_stories.variables; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(variables),UPDATE(variables) ON TABLE publ.user_stories TO ticket_app_visitor;


--
-- Name: COLUMN user_stories.parent_id; Type: ACL; Schema: publ; Owner: -
--

GRANT INSERT(parent_id),UPDATE(parent_id) ON TABLE publ.user_stories TO ticket_app_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: publ; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ticket_app_owner IN SCHEMA publ GRANT SELECT,USAGE ON SEQUENCES  TO ticket_app_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: publ; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ticket_app_owner IN SCHEMA publ GRANT ALL ON FUNCTIONS  TO ticket_app_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ticket_app_owner IN SCHEMA public GRANT SELECT,USAGE ON SEQUENCES  TO ticket_app_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ticket_app_owner IN SCHEMA public GRANT ALL ON FUNCTIONS  TO ticket_app_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ticket_app_owner REVOKE ALL ON FUNCTIONS  FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

