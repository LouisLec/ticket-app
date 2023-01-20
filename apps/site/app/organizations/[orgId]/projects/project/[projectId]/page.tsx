import { sdk } from "../../../../../../utils/sdk";
import { Domains } from "./domains";

const ProjectPage = async ({ params: { projectId } }) => {
  const data = await sdk.GetProjectById({ projectId: projectId });
  return (
    <main className="min-h-screen dark:bg-black">
      <div className="max-w-5xl px-8 pt-20 mx-auto">
        <h1 className="text-5xl dark:text-slate-50">
          Project: {data.project.name}
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400">
          {data.project.description}
        </p>
      </div>
      <Domains domains={data.project.domainsList} projectId={projectId} />
    </main>
  );
};

export default ProjectPage;
