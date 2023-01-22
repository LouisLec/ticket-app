"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { GetProjectByIdQuery, TaskStatus } from "@ticketApp/codegen";
import { FC } from "react";

import { Typography } from "@/ui/server/typography";
import { UserStory } from "./UserStory";

export const Epic: FC<
  ExtractArrayType<ExtractType<GetProjectByIdQuery, "project">, "epicsList"> & {
    domains: ExtractType<
      ExtractType<GetProjectByIdQuery, "project">,
      "domainsList"
    >;
  }
> = ({ description, name, userStoriesList, domains }) => {
  return (
    <>
      <Disclosure defaultOpen as="div" className="flex flex-col gap-2 mb-12">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center w-full max-w-5xl gap-2 mx-auto items-between">
              <Typography>
                <ChevronRightIcon
                  className={
                    "w-4 h-4 transition-all  transform " +
                    (open ? "rotate-90" : "rotate-0")
                  }
                />
              </Typography>
              <div className="text-start">
                <Typography style="strong" as="h3">
                  {name}
                </Typography>
                <Typography style="small" as="p">
                  {description}
                </Typography>
              </div>
            </Disclosure.Button>

            {/* <pre>{JSON.stringify(epic, null, 2)}</pre> */}
            <Disclosure.Panel className="flex flex-col mt-8 ">
              {userStoriesList?.map(userStory => (
                <UserStory
                  domains={domains}
                  key={userStory.id}
                  {...userStory}
                />
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};
