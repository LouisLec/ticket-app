import Link from "next/link";

import { PencilSquareIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import { sdk } from "../../../../utils/sdk";
import { conciseDate } from "../../../../utils/format-primitives";

const ProjectsPerOrgPage = async ({ params }) => {
  const { orgId } = params;
  const data = await sdk.GetOrganizationById({ id: orgId });
  return (
    <main className="">
      <div role="document" className="mx-auto mt-20 prose max-w-none">
        <div className="px-8 mx-auto max-w-prose">
          <small>{data?.organization.name}</small>
          <h1>Projets</h1>
          <Link
            href={`/organizations/${data.organization.id}/projects/new`}
            className="inline-flex px-2 py-1 no-underline border-2 rounded bg-slate-100 text-slate-800 border-lime-600"
          >
            <SquaresPlusIcon className="w-6 h-6" />
            <span className="ml-2">Nouveau projet</span>
          </Link>
        </div>
        <table className="mx-8">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">description</th>
              <th scope="col">createdAt</th>
              <th scope="col">updatedAt</th>
            </tr>
          </thead>
          <tbody>
            {data.organization?.projects.nodes.map(project => (
              <tr key={project.id}>
                <th className="" scope="row">
                  <button className="inline-flex  text-xs bg-slate-300 font-mono py-0.5 px-1 rounded text-slate-600">
                    <PencilSquareIcon className="w-4 h-4" /> {project.id}
                  </button>
                </th>
                <td>
                  {" "}
                  <span className="font-mono text-xs font-bold font-slate-600">
                    #{project.order}
                  </span>{" "}
                  {project.name}
                </td>
                <td>{project.description}</td>
                <td>{conciseDate(project.createdAt)}</td>
                <td>{conciseDate(project.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ProjectsPerOrgPage;
