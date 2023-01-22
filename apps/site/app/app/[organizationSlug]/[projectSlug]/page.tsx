import { Typography } from "@/ui/server/typography";
import { sdk } from "@/utils/sdk";

const ProjectHomepage = async ({
  params: { organizationSlug, projectSlug },
}) => {
  const data = await sdk.GetProjectBySlug({ projectSlug, organizationSlug });

  return (
    <div className="bg-slate-900">
      <div className="min-h-screen mx-20 dark:bg-black rounded-t-3xl"></div>
    </div>
  );
};

export default ProjectHomepage;
