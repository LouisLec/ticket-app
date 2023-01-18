import Link from "next/link";

import { PencilSquareIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import { sdk } from "../../../utils/sdk";

const ProjectsPerOrgPage = async ({ params }) => {
  const { orgId } = params;
  const data = await sdk.GetOrganizationById({ id: orgId });
  return (
    <main className="">
      <div role="document" className="mx-auto mt-20 prose max-w-none">
        <div className="px-8 mx-auto max-w-prose">
          <small>bienvenu sur la page de</small>
          <h1>{data?.organization.name}</h1>
          <Link
            href={`/organizations/${data?.organization?.id}/projects`}
            className="inline-flex px-2 py-1 no-underline border-2 rounded bg-slate-100 text-slate-800 border-lime-600"
          >
            <SquaresPlusIcon className="w-6 h-6" />
            <span className="ml-2">Voir tous les projets</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProjectsPerOrgPage;
