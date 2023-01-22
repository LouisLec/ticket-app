/*
  TABLE: publ.user_stories
  DESCRIPTION:  A user story is a description of a feature from the perspective of the end user. It is a building block of an epic.
*/
drop table if exists publ.user_stories cascade;
create table publ.user_stories (
    id uuid not null default uuid_generate_v4() primary key unique, 
    name text,
    "order" int,
    as_a uuid references publ.personas(id) on delete restrict,
    i_want text not null,
    so_that text,
    epic_id uuid references publ.epics(id) on delete restrict,
    validation_criteria text,
    comments text,
    variables text,
    parent_id uuid references publ.user_stories(id) on delete restrict,
    -- status text not null, //no status, for now it is computed from the tasks
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
    create index on publ.user_stories(epic_id);
     create index on publ.user_stories(as_a);
    create index on publ.user_stories("order");
    create index on publ.user_stories(parent_id);
  create index on publ.user_stories(created_at);
  create index on publ.user_stories(updated_at);

-- RBAC
  grant select on publ.user_stories to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.user_stories
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.user_stories enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.user_stories
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
  -- 5 user stories pour chacun des epics suivants: Authentification, Contribution, Contribution, Recherche

  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('461d71b1-6610-46cb-984c-52bf86953420', 'En tant qu''utilisateur, je veux pouvoir m''authentifier sur le site, afin de pouvoir accéder à mes données personnelles.', 0, null, 'm''authentifier sur le site', 'pouvoir accéder à mes données personnelles', (select id from publ.epics where name='Authentification'), 'Je peux me connecter avec mon nom d''utilisateur et mon mot de passe.', 'Les données personnelles sont les données que l''utilisateur a renseignées lors de son inscription.', 'username, password', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('8dcdfd04-1ea0-4f82-8b0a-6ac3f2d6a75a', 'En tant qu''utilisateur, je veux pouvoir m''inscrire sur le site, afin de pouvoir accéder à mes données personnelles.', 1, null, 'm''inscrire sur le site', 'pouvoir accéder à mes données personnelles', (select id from publ.epics where name='Authentification'), 'Je peux me connecter avec mon nom d''utilisateur et mon mot de passe.', 'Les données personnelles sont les données que l''utilisateur a renseignées lors de son inscription.', 'username, password', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('aab99bcd-29d0-4207-b5a3-7a09ceb2e804', 'En tant qu''utilisateur, je veux pouvoir modifier mes données personnelles, afin de pouvoir les mettre à jour.', 2, null, 'modifier mes données personnelles', 'pouvoir les mettre à jour', (select id from publ.epics where name='Authentification'), 'Je peux modifier mes données personnelles.', 'Les données personnelles sont les données que l''utilisateur a renseignées lors de son inscription.', 'username, password', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('8c96fc90-18c5-4b78-a51b-49f68c3f2aee', 'En tant qu''utilisateur, je veux pouvoir supprimer mon compte, afin de pouvoir supprimer mes données personnelles.', 3, null, 'supprimer mon compte', 'pouvoir supprimer mes données personnelles', (select id from publ.epics where name='Authentification'), 'Je peux supprimer mon compte.', 'Les données personnelles sont les données que l''utilisateur a renseignées lors de son inscription.', 'username, password', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('51403d51-0aec-4740-a441-2a259c0dbe60', 'En tant qu''utilisateur, je veux pouvoir me déconnecter du site, afin de pouvoir quitter le site.', 4, null, 'me déconnecter du site', 'pouvoir quitter le site', (select id from publ.epics where name='Authentification'), 'Je peux me déconnecter du site.', 'Les données personnelles sont les données que l''utilisateur a renseignées lors de son inscription.', 'username, password', null, now(), now());

  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('b2643378-d7f0-48f7-9445-21e8273228e2', 'En tant qu''utilisateur, je veux pouvoir publier un article, afin de pouvoir le partager avec les autres utilisateurs.', 0, null, 'publier un article', 'pouvoir le partager avec les autres utilisateurs',  (select id from publ.epics where name='Contribution'), 'Je peux publier un article.', 'Les articles sont les publications que les utilisateurs peuvent partager avec les autres utilisateurs.', 'title, content', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('d2155aaa-f3e8-443c-abca-3988fafd8a5e', 'En tant qu''utilisateur, je veux pouvoir modifier un article, afin de pouvoir le mettre à jour.', 1, null, 'modifier un article', 'pouvoir le mettre à jour',  (select id from publ.epics where name='Publication'), 'Je peux modifier un article.', 'Les articles sont les publications que les utilisateurs peuvent partager avec les autres utilisateurs.', 'title, content', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('4a9712c8-eae4-4cce-9db2-f5777c4814a8', 'En tant qu''utilisateur, je veux pouvoir supprimer un article, afin de pouvoir le retirer de la liste des articles.', 2, null, 'supprimer un article', 'pouvoir le retirer de la liste des articles',  (select id from publ.epics where name='Publication'), 'Je peux supprimer un article.', 'Les articles sont les publications que les utilisateurs peuvent partager avec les autres utilisateurs.', 'title, content', null, now(), now());

  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('035f4838-21da-4021-8e41-4ec19be5f286', 'En tant qu''utilisateur, je veux pouvoir commenter un article, afin de pouvoir donner mon avis sur l''article.', 0, null, 'commenter un article', 'pouvoir donner mon avis sur l''article',  (select id from publ.epics where name='Contribution'), 'Je peux commenter un article.', 'Les commentaires sont les avis que les utilisateurs peuvent donner sur les articles.', 'content', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('8da1f0c5-bbbc-48fd-8109-2c7bcffd6794', 'En tant qu''utilisateur, je veux pouvoir modifier un commentaire, afin de pouvoir le mettre à jour.', 1, null, 'modifier un commentaire', 'pouvoir le mettre à jour',  (select id from publ.epics where name='Contribution'), 'Je peux modifier un commentaire.', 'Les commentaires sont les avis que les utilisateurs peuvent donner sur les articles.', 'content', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('4d8ecec7-7935-4757-a586-a4ae527a42db', 'En tant qu''utilisateur, je veux pouvoir supprimer un commentaire, afin de pouvoir le retirer de la liste des commentaires.', 2, null, 'supprimer un commentaire', 'pouvoir le retirer de la liste des commentaires',  (select id from publ.epics where name='Contribution'), 'Je peux supprimer un commentaire.', 'Les commentaires sont les avis que les utilisateurs peuvent donner sur les articles.', 'content', null, now(), now());

  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('c5f25460-159f-456c-b566-f4e46955dc6b', 'En tant qu''utilisateur, je veux pouvoir créer un compte, afin de pouvoir accéder à toutes les fonctionnalités du site.', 0, null, 'créer un compte', 'pouvoir accéder à toutes les fonctionnalités du site',  (select id from publ.epics where name='Recherche'), 'Je peux créer un compte.', 'Les comptes sont les accès que les utilisateurs peuvent créer pour accéder à toutes les fonctionnalités du site.', 'username, password', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('e1762de5-09f4-4832-b4bf-f04953c71aca', 'En tant qu''utilisateur, je veux pouvoir modifier un compte, afin de pouvoir le mettre à jour.', 1, null, 'modifier un compte', 'pouvoir le mettre à jour',  (select id from publ.epics where name='Recherche'), 'Je peux modifier un compte.', 'Les comptes sont les accès que les utilisateurs peuvent créer pour accéder à toutes les fonctionnalités du site.', 'username, password', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('fb98f4ef-f5ae-4970-86e7-cffcafa15696', 'En tant qu''utilisateur, je veux pouvoir supprimer un compte, afin de pouvoir le retirer de la liste des comptes.', 2, null, 'supprimer un compte', 'pouvoir le retirer de la liste des comptes',  (select id from publ.epics where name='Recherche'), 'Je peux supprimer un compte.', 'Les comptes sont les accès que les utilisateurs peuvent créer pour accéder à toutes les fonctionnalités du site.', 'username, password', null, now(), now());

  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('9e10aad1-5f93-4b7c-b257-a52d11a69983', 'En tant qu''utilisateur, je veux pouvoir créer un groupe, afin de pouvoir partager des articles avec d''autres utilisateurs.', 0, null, 'créer un groupe', 'pouvoir partager des articles avec d''autres utilisateurs',  (select id from publ.epics where name='Recherche'), 'Je peux créer un groupe.', 'Les groupes sont les listes d''utilisateurs que les utilisateurs peuvent créer pour partager des articles avec d''autres utilisateurs.', 'name', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('cf946f2f-e1cc-48f3-82ed-2fad1f8528b0', 'En tant qu''utilisateur, je veux pouvoir modifier un groupe, afin de pouvoir le mettre à jour.', 1, null, 'modifier un groupe', 'pouvoir le mettre à jour',  (select id from publ.epics where name='Recherche'), 'Je peux modifier un groupe.', 'Les groupes sont les listes d''utilisateurs que les utilisateurs peuvent créer pour partager des articles avec d''autres utilisateurs.', 'name', null, now(), now());
  insert into publ.user_stories (id, name, "order", as_a, i_want, so_that, epic_id, validation_criteria, comments, variables, parent_id, created_at, updated_at)
  values ('d1a34be5-595b-40a8-9bf6-8b11de5a9548', 'En tant qu''utilisateur, je veux pouvoir supprimer un groupe, afin de pouvoir le retirer de la liste des groupes.', 2, null, 'supprimer un groupe', 'pouvoir le retirer de la liste des groupes',  (select id from publ.epics where name='Recherche'), 'Je peux supprimer un groupe.', 'Les groupes sont les listes d''utilisateurs que les utilisateurs peuvent créer pour partager des articles avec d''autres utilisateurs.', 'name', null, now(), now());



/*
  END TABLE: publ.user_stories
*/

drop table if exists priv.update_user_story_order_log cascade;
create table priv.update_user_story_order_log (
  id uuid not null default uuid_generate_v4() primary key unique,
  epic_id uuid not null references publ.epics(id) on delete cascade
);

create or replace function publ.update_user_story_order() returns trigger as $$
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
$$ language plpgsql volatile security definer;

-- triggers
  create trigger _100_update_user_story_order
  before insert or update on publ.user_stories
  for each row
  execute procedure publ.update_user_story_order();

