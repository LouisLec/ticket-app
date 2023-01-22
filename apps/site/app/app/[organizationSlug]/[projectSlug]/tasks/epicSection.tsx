"use client";

import { GetProjectByIdQuery, TaskStatus } from "@ticketApp/codegen";
import { FC } from "react";
import { Epic } from "./Epic";

export const EpicSection: FC<{
  projectId: string;
  epics: ExtractType<ExtractType<GetProjectByIdQuery, "project">, "epicsList">;
  domains: ExtractType<
    ExtractType<GetProjectByIdQuery, "project">,
    "domainsList"
  >;
}> = ({ epics, domains }) => {
  return (
    <section className="pt-12 mt-8">
      <div className="flex flex-col gap-4">
        {epics.map(epic => (
          <Epic domains={domains} {...epic} key={epic.id} />
        ))}
      </div>
    </section>
  );
};
