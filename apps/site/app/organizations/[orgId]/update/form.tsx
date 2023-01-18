"use client";

import {
  Organization,
  OrganizationInput,
  OrganizationPatch,
  UpdateOrganizationInput,
} from "@ticketApp/codegen";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { pick } from "../../../../utils/pickAndOmit";
import { sdk } from "../../../../utils/sdk";

export const Form = ({
  initialValues,
}: {
  initialValues: Partial<Organization>;
}) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<OrganizationPatch>({
    defaultValues: pick(initialValues, ["name", "logoUrl", "description"]),
  });
  const onSubmit = handleSubmit(async data => {
    sdk
      .UpdateOrganization({
        input: {
          id: initialValues?.id,
          patch: data,
        },
      })
      .then(data => {
        console.log(data);
        router.push(`/organizations`);
      });
  });
  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <div className="grid gap-6">
        <label className="block" htmlFor="name">
          <span>Name</span>
          <input type="text" id="name" {...register("name")} />
        </label>
        <label className="block" htmlFor="description">
          <span>Description</span>
          <textarea rows={5} id="description" {...register("description")} />
        </label>
        <label className="block" htmlFor="logoUrl">
          <span>LogoUrl</span>
          <input type="text" id="logoUrl" {...register("logoUrl")} />
        </label>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
