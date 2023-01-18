import {
  Organization,
  OrganizationInput,
  ProjectInput,
} from "@ticketApp/codegen";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { sdk } from "../../../../../utils/sdk";
import { Form } from "./form";

const NewProjectPage = async ({ params: { orgId } }) => {
  const org = await sdk.GetOrganizationById({ id: orgId });

  return (
    <main className="">
      <div role="document" className="mx-auto mt-20 prose">
        <div className="max-w-5xl px-8 mx-auto">
          <h1>Nouveau Projet</h1>
        </div>
        <Form organization={org.organization as Organization} />
      </div>
    </main>
  );
};

export default NewProjectPage;
