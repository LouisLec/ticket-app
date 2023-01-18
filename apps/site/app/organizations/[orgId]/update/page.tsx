import { Organization } from "@ticketApp/codegen";
import { sdk } from "../../../../utils/sdk";
import { Form } from "./form";

const NewOrganizationPage = async ({ params: { orgId } }) => {
  const org = await sdk.GetOrganizationById({ id: orgId });
  return (
    <main className="">
      <div role="document" className="mx-auto mt-20 prose">
        <div className="max-w-5xl px-8 mx-auto">
          <small>Mise à jour</small>
          <h1>{org.organization.name}</h1>
        </div>
        <Form initialValues={org.organization as Partial<Organization>} />
      </div>
    </main>
  );
};

export default NewOrganizationPage;
