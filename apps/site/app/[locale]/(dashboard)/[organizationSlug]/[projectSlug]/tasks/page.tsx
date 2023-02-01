import { sdk } from "@/utils/sdk";
import { cookies } from "next/headers";
import { EpicSection } from "./EpicSection";

const Tasks = async ({ params: { organizationSlug, projectSlug } }) => {
  const nextCookies = cookies();
  const token = nextCookies.get("jwt");
  const data = await sdk({
    headers:
      token?.value !== undefined
        ? {
            Authorization: `Bearer ${token?.value}`,
          }
        : {},
  }).GetProjectBySlug({
    projectSlug,
    organizationSlug,
  });
  return (
    <div className="min-h-screen pt-12 mx-20 bg-white border dark:bg-black rounded-t-3xl dark:border-slate-800 border-slate-200">
      <EpicSection
        domains={data.projectBySlug?.domainsList}
        epics={data.projectBySlug?.epicsList}
        projectId={data?.projectBySlug?.id}
        personas={data?.projectBySlug?.personasList}
      />
    </div>
  );
};

export default Tasks;

export const fetchCache = "default-no-store";
