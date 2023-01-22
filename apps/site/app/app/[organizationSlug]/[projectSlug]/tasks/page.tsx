import { sdk } from "@/utils/sdk";
import { EpicSection } from "./epicSection";

export const Tasks = async ({ params: { organizationSlug, projectSlug } }) => {
  const data = await sdk.GetProjectBySlug({ projectSlug, organizationSlug });
  return (
    <div className="min-h-screen mx-20 dark:bg-black rounded-t-3xl">
      <EpicSection
        domains={data.projectBySlug.domainsList}
        epics={data.projectBySlug.epicsList}
        projectId={data?.projectBySlug?.id}
      />
    </div>
  );
};

export default Tasks;
