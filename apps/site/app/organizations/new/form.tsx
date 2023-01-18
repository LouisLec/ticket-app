"use client";

import { OrganizationInput } from "@ticketApp/codegen";
import { useForm } from "react-hook-form";
import { sdk } from "../../../utils/sdk";

export const Form = () => {
  const { register, handleSubmit } = useForm<OrganizationInput>();
  const onSubmit = handleSubmit(async data => {
    sdk.CreateOrganization({ input: { organization: data } }).then(data => {
      console.log(data);
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
