import { sdk } from "@/utils/sdk";
import { Fragment } from "react";
import { ProjectDiagram } from "./Tree";

const Devis = async ({ params: { organizationSlug, projectSlug } }) => {
  const data = await sdk.GetProjectBySlug({ projectSlug, organizationSlug });
  return (
    <div className="min-h-screen pt-12 mx-20 bg-white border dark:bg-black rounded-t-3xl dark:border-slate-800 border-slate-200 print:m-0 print:p-0 print:bg-white print:rounded-none print:border-none">
      <div className="px-8 py-6 mx-auto font-mono leading-none rounded-md max-w-prose bg-slate-800 text-slate-100">
        <ProjectDiagram
          projectName={data?.projectBySlug?.name}
          epics={data?.projectBySlug?.epicsList}
        />
      </div>
      <div className="mx-auto prose">
        {/* <TreeView epics={data.projectBySlug?.epicsList} /> */}

        <h1>Devis</h1>
        {data.projectBySlug?.epicsList.map(epic => (
          <div key={epic.id}>
            <h2>{epic.name}</h2>
            <p>{epic.description}</p>
            <>
              {epic.userStoriesList.map(us => (
                <Fragment key={us.id}>
                  <h3>{us.name}</h3>

                  <div>
                    <table className="table-auto">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">Nom</th>
                          <th className="px-4 py-2">Description</th>
                          <th className="px-4 py-2">Estimation</th>
                          <th className="px-4 py-2">Prix</th>
                        </tr>
                      </thead>
                      <tbody>
                        {us.tasksList.map(task => (
                          <tr key={task.id}>
                            <td className="px-4 py-2 border">{task.name}</td>
                            <td className="px-4 py-2 border">
                              {task.description}
                            </td>
                            <td className="px-4 py-2 border">
                              {task.estimate}
                            </td>
                            <td className="px-4 py-2 border">
                              {task.estimate * 100}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Fragment>
              ))}
            </>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Devis;

export const fetchCache = "default-no-store";
