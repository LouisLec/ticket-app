"use client";

import { Organization, ProjectInput } from "@ticketApp/codegen";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { sdk } from "../../../../../utils/sdk";
export const Form = ({ organization }: { organization: Organization }) => {
  const { register, handleSubmit } = useForm<ProjectInput>();

  const router = useRouter();
  const onSubmit = handleSubmit(async data => {
    sdk
      .CreateProject({
        input: { project: { ...data, organizationId: organization.id } },
      })
      .then(data => {
        console.log(data);
        router.push(`/organizations/${organization?.id}/projects`);
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

        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
