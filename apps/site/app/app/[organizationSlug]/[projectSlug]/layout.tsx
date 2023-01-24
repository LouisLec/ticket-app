import { Breadcrumbs } from "@/ui/server/breadcrumbs";
import { Typography } from "@/ui/server/typography";
import { sdk } from "@/utils/sdk";
import { Tabs } from "./tabs";

export const ProjectLayout = async ({
  children,
  params: { organizationSlug, projectSlug },
}) => {
  const data = await sdk.GetProjectBySlug({ projectSlug, organizationSlug });

  return (
    <>
      <div className="pt-10 pb-5 -mb-10 border-b border-slate-200 sm:pb-0 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto ">
          <Breadcrumbs
            pages={[
              {
                name: data.projectBySlug?.organization?.name,
                slug: organizationSlug,
              },
              { name: "Projets", slug: "projects" },
              { name: data.projectBySlug?.name, slug: projectSlug },
            ]}
          />
          <div className="mt-8">
            <Typography as="h1" style="big-x">
              <Typography soften>Projet</Typography> {data.projectBySlug?.name}
            </Typography>
            <Typography as="p">{data.projectBySlug?.description}</Typography>
          </div>

          <Tabs slug={`/app/${organizationSlug}/${projectSlug}`} />
        </div>

        <div className="h-10" />
      </div>

      <div className="dark:bg-slate-900">{children}</div>
    </>
  );
};

export default ProjectLayout;

export const fetchCache = "default-no-store";
