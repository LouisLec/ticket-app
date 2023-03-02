"use client";

import { GetProjectBySlugQuery, UpdateProjectInput } from "@ticketApp/codegen";
import { Field, GenericForm, GenericFormProps } from "@/components";
import { SlideOver } from "@/ui/client/slideOver";
import { CogIcon } from "@heroicons/react/20/solid";
import { FC, useState } from "react";
import { sdk } from "@/utils/sdk/sdk";

export const ProjectUpdater: FC<GetProjectBySlugQuery> = project => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-slate-500 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-slate-500"
        aria-label="Settings"
        onClick={function (): void {
          setOpen(true);
        }}
      >
        <CogIcon className="w-6 h-6 text-slate-500" aria-hidden="true" />
      </button>
      <SlideOver title="Update Project" open={open} setOpen={setOpen}>
        <GenericForm
          onCanceled={function (): void {
            setOpen(false);
          }}
          onSuccess={function (): void {
            console.log("success");
            setOpen(false);
          }}
          action={"update"}
          {...updateTaskFormProps({ queryResult: project })}
        />
      </SlideOver>
    </>
  );
};

export const updateTaskFormProps: (input: {
  queryResult: GetProjectBySlugQuery;
}) => Omit<
  GenericFormProps<UpdateProjectInput>,
  "onCanceled" | "onDelete" | "onSuccess"
> = ({ queryResult }) => {
  const { projectBySlug: project } = queryResult;
  const fields: Field<UpdateProjectInput>[] = [
    {
      name: "id",
      type: "text",
      hidden: true,
      label: "Id",
      initialValue: project.id,
    },

    {
      name: "patch.name",
      label: "Name",
      type: "text",
      required: true,
      initialValue: project.name,
    },
    {
      name: "patch.description",
      label: "Description",
      type: "textarea",
      required: true,
      initialValue: project.description,
    },
    {
      name: "patch.coeffLuidgy",
      label: "Coeff Luidgy",
      type: "number",
      required: true,
      initialValue: project.coeffLuidgy,
    },
    {
      name: "patch.dailyRate",
      label: "Daily Rate",
      type: "number",
      required: true,
      initialValue: project.dailyRate,
    },
    {
      name: "patch.pointsPerDay",
      label: "Points Per Day",
      type: "number",
      required: true,
      initialValue: project.pointsPerDay,
    },
    {
      name: "patch.isNgo",
      label: "Is Ngo",
      type: "boolean",
      required: true,
      initialValue: project.isNgo,
    },
    {
      name: "patch.initialContext",
      label: "Initial Context",
      type: "textarea",
      required: true,
      initialValue: project.initialContext,
    },
  ];
  return {
    async onSubmit(data) {
      await sdk().UpdateProject({ input: data });
    },
    action: "update",
    fields,
  };
};
