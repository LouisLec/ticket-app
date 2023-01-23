import { Typography } from "@/ui/server/typography";
import { sdk } from "@/utils/sdk";

const ProjectHomepage = async ({
  params: { organizationSlug, projectSlug },
}) => {
  const data = await sdk.GetProjectBySlug({ projectSlug, organizationSlug });

  return (
    <div className="min-h-screen pt-12 mx-20 bg-white border dark:bg-black rounded-t-3xl dark:border-slate-800 border-slate-200"></div>
  );
};

export default ProjectHomepage;
