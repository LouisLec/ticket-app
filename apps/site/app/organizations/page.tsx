import Link from "next/link";
import { sdk } from "../../utils/sdk";
import { PencilSquareIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import { conciseDate } from "../../utils/format-primitives";

const OrganizationsPage = async () => {
  const data = await sdk.GetAllOrganization();
  return (
    <main className="">
      <div role="document" className="mx-auto mt-20 prose max-w-none">
        <div className="px-8 mx-auto max-w-prose">
          <h1>Organizations</h1>
          <Link
            href={"/organizations/new"}
            className="inline-flex px-2 py-1 no-underline border-2 rounded bg-slate-100 text-slate-800 border-lime-600"
          >
            <SquaresPlusIcon className="w-6 h-6" />
            <span className="ml-2">Nouvelle Organisation</span>
          </Link>
        </div>
        <table className="mx-8">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">description</th>
              <th scope="col">logo</th>
              <th scope="col">createdAt</th>
              <th scope="col">updatedAt</th>
            </tr>
          </thead>
          <tbody>
            {data.organizations.nodes.map(organization => (
              <tr key={organization.id}>
                <th className="" scope="row">
                  <Link
                    className="inline-flex  text-xs bg-slate-300 font-mono py-0.5 px-1 rounded text-slate-600"
                    href={"/organizations/" + organization.id}
                  >
                    <PencilSquareIcon className="w-4 h-4" /> {organization.id}
                  </Link>
                </th>
                <td>{organization.name}</td>
                <td>{organization.description}</td>
                <td>{organization.logoUrl}</td>
                <td>{conciseDate(organization.createdAt)}</td>
                <td>{conciseDate(organization.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default OrganizationsPage;
