"use client";

import { Disclosure } from "@headlessui/react";
import {
  ChevronRightIcon,
  SquaresPlusIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";
import { DomainFragmentFragment } from "@ticketApp/codegen";
import { FC, useReducer, useState } from "react";
import { SlideOver } from "../../../../../../ui/client/slideOver";
import { CreateDomainForm, UpdateDomainForm } from "./forms";

interface State {
  isEditting: boolean;
  selectedDomain: DomainFragmentFragment | null;
  action: "create" | "edit" | "delete" | null;
}

interface Event {
  type: "edit" | "create" | "reset" | "delete";
  payload?: DomainFragmentFragment | null;
}

export const Domains: FC<{
  domains: DomainFragmentFragment[];
  projectId: string;
}> = ({ domains, projectId }) => {
  const [state, dispatch] = useReducer(
    (state: State, event: Event) => {
      switch (event.type) {
        case "edit":
          return { ...state, selectedDomain: event.payload, action: "edit" };
        case "create":
          return { ...state, selectedDomain: null, action: "create" };
        case "reset":
          return { ...state, selectedDomain: null, action: null };
        case "delete":
          return { ...state, selectedDomain: event.payload, action: "delete" };

        default:
          throw new Error();
      }
    },
    { isEditting: false, selectedDomain: null, action: null }
  );

  return (
    <>
      <Disclosure>
        {({ open }) => (
          <div className="relative max-w-5xl mx-auto mt-8 overflow-visible">
            <div className="flex justify-between">
              <Disclosure.Button className={"inline-flex gap-1 items-center "}>
                {" "}
                <ChevronRightIcon
                  className={
                    "w-4 h-4 transition-all transform " +
                    (open ? "rotate-90" : "rotate-0")
                  }
                />
                <h2 className="text-xl tracking-wide uppercase font-cal dark:text-teal-300">
                  Domains
                </h2>
              </Disclosure.Button>
              <button
                onClick={() => {
                  dispatch({ type: "create", payload: null });
                }}
                className="inline-flex items-center gap-2 px-2 py-1 text-sm font-bold underline border-2 border-teal-300 rounded dark:bg-slate-900 bg-slate-300 dark:text-teal-300"
              >
                <SquaresPlusIcon className="w-4 h-4" /> Ajouter
              </button>
            </div>
            <Disclosure.Panel className="grid gap-1 mt-2 ">
              {domains.map(domain => (
                <div
                  className="flex flex-col px-2 py-1 border-l-8 rounded bg-slate-300 dark:bg-slate-800"
                  style={{ borderColor: domain.color }}
                >
                  <div className="flex items-start justify-between flex-grow">
                    <h3 className="text-sm font-bold dark:text-slate-50">
                      {domain.name}
                    </h3>
                    <button
                      onClick={() => {
                        dispatch({ type: "edit", payload: domain });
                      }}
                    >
                      <SwatchIcon className="flex-shrink-0 w-4 h-4 text-teal-500 dark:text-teal-300" />
                    </button>
                  </div>
                  <p className="text-xs line-clamp-3 text-slate-600 dark:text-slate-300">
                    {domain.description}
                  </p>
                </div>
              ))}
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
      <SlideOver
        open={state.action === "create"}
        setOpen={() => dispatch({ type: "reset" })}
        title="Ajouter un domaine"
      >
        <CreateDomainForm
          projectId={projectId}
          onSuccess={() => dispatch({ type: "reset" })}
          onCanceled={() => dispatch({ type: "reset" })}
        />
      </SlideOver>

      <SlideOver
        open={state.action === "edit"}
        setOpen={() => dispatch({ type: "reset" })}
        title="Modifier un domaine"
      >
        <UpdateDomainForm
          initialValues={state.selectedDomain}
          onSuccess={() => dispatch({ type: "reset" })}
          onCanceled={() => dispatch({ type: "reset" })}
        />
      </SlideOver>
    </>
  );
};
