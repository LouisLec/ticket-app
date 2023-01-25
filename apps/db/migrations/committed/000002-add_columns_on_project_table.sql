--! Previous: sha1:adb7264f5b8d467be3a31f8c8e1e54edb66a227d
--! Hash: sha1:e3b3ab2904929b58e3b2d9de2a627978c57808ed
--! Message: add_columns_on_project_table

--! split: 1-current.sql
-- Enter migration here
alter table publ.projects drop column if exists initial_context;
alter table publ.projects add column initial_context text;

alter table publ.projects drop column if exists daily_rate;
alter table publ.projects add column daily_rate int default 650;

alter table publ.projects drop column if exists points_per_day;
alter table publ.projects add column points_per_day int default 6;

alter table publ.projects drop column if exists coeff_luidgy;
alter table publ.projects add column coeff_luidgy int default 1;

alter table publ.projects drop column if exists is_ngo;
alter table publ.projects add column is_ngo boolean default false;
