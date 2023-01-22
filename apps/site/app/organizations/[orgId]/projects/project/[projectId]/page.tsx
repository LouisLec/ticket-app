import { SwatchIcon } from "@heroicons/react/24/outline";
import { sdk } from "../../../../../../utils/sdk";
import { Domains } from "./domains";
import { Epics } from "./epics";
import { EpicSection } from "./epicSection";
import { Personas } from "./personas";

const ProjectPage = async ({ params: { projectId } }) => {
  const data = await sdk.GetProjectById({ projectId: projectId });
  return (
    <div className="relative h-screen dark:bg-black">
      <div className="absolute -translate-x-1/2 bg-teal-500 opacity-40 inset-x-1/2 w-96 h-96 animate-pseudo-random-move blur-3xl" />
      <div className="absolute -translate-x-1/3 opacity-40 bg-cyan-500 inset-x-1/3 w-80 h-80 animate-chaotic-move blur-3xl" />

      <div className="relative flex items-start gap-4 dark:bg-black">
        <aside className="sticky max-w-md m-8 top-8 ">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 blur" />
            <div className="relative px-4 py-2 rounded-lg shadow-xl bg-slate-200 dark:bg-black ">
              <div className="max-w-5xl px-8 pt-8 mx-auto">
                <h1 className="text-2xl dark:text-slate-50 font-cal">
                  <span className="text-slate-500">Project:</span>{" "}
                  {data.project.name}
                </h1>
                <p className=" text-slate-500 dark:text-slate-300">
                  {data.project.description}
                </p>
              </div>
              <Domains
                domains={data.project.domainsList}
                projectId={projectId}
              />
              <Personas
                personas={data.project.personasList}
                projectId={projectId}
              />
              <Epics epics={data.project.epicsList} projectId={projectId} />
            </div>
          </div>
        </aside>
        <main className="flex-grow mt-8 overflow-auto">
          <EpicSection
            epics={data?.project?.epicsList as any}
            projectId={data.project.id}
            domains={data.project.domainsList}
          />
        </main>
      </div>
    </div>
  );
};

export default ProjectPage;
