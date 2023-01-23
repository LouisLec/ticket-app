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
  personas: ExtractType<
    ExtractType<GetProjectByIdQuery, "project">,
    "personasList"
  >;
}> = ({ epics, domains, personas }) => {
  return (
    <section className="mt-8 ">
      <div className="flex flex-col gap-4">
        {epics.map(epic => (
          <Epic domains={domains} {...epic} key={epic.id} personas={personas} />
        ))}
      </div>
    </section>
  );
};
