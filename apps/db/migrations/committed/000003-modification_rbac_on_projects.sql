--! Previous: sha1:e3b3ab2904929b58e3b2d9de2a627978c57808ed
--! Hash: sha1:dc0be9ec06b12df32aa2982128f0634d24bc4590
--! Message: modification_RBAC_on_projects

--! split: 1-current.sql
grant select on publ.projects to :DATABASE_VISITOR;
    grant insert(name, description, organization_id,initial_context, daily_rate, points_per_day, coeff_luidgy, is_ngo) on publ.projects to :DATABASE_VISITOR;
    grant update(name, description, initial_context, daily_rate, points_per_day, coeff_luidgy, is_ngo) on publ.projects to :DATABASE_VISITOR;
    grant delete on publ.projects to :DATABASE_VISITOR;
