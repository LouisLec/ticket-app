"use client";

import { SquaresPlusIcon, SwatchIcon } from "@heroicons/react/24/outline";
import { PersonaFragmentFragment } from "@ticketApp/codegen";
import { FC, useReducer, useState } from "react";
import { SlideOver } from "../../../../../../ui/client/slideOver";
import { CreatePersonaForm, UpdatePersonaForm } from "./forms";

interface State {
  isEditting: boolean;
  selectedPersona: PersonaFragmentFragment | null;
  action: "create" | "edit" | "delete" | null;
}

interface Event {
  type: "edit" | "create" | "reset" | "delete";
  payload?: PersonaFragmentFragment | null;
}

export const Personas: FC<{
  personas: PersonaFragmentFragment[];
  projectId: string;
}> = ({ personas, projectId }) => {
  const [state, dispatch] = useReducer(
    (state: State, event: Event) => {
      switch (event.type) {
        case "edit":
          return { ...state, selectedPersona: event.payload, action: "edit" };
        case "create":
          return { ...state, selectedPersona: null, action: "create" };
        case "reset":
          return { ...state, selectedPersona: null, action: null };
        case "delete":
          return { ...state, selectedPersona: event.payload, action: "delete" };

        default:
          throw new Error();
      }
    },
    { isEditting: false, selectedPersona: null, action: null }
  );

  return (
    <div className="relative">
      <div className="absolute -translate-x-1/2 bg-teal-500 opacity-40 inset-x-1/2 w-96 h-96 animate-pseudo-random-move blur-3xl" />
      <div className="absolute -translate-x-1/3 opacity-40 bg-cyan-500 inset-x-1/3 w-80 h-80 animate-chaotic-move blur-3xl" />
      <div className="relative max-w-5xl px-8 mx-auto mt-20 overflow-visible">
        <div className="flex justify-between">
          <h2 className="text-2xl tracking-wide uppercase bold dark:text-teal-300">
            Personas
          </h2>
          <button
            onClick={() => {
              dispatch({ type: "create", payload: null });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 font-bold underline border-2 border-teal-300 rounded dark:bg-slate-900 bg-slate-300 dark:text-teal-300"
          >
            <SquaresPlusIcon className="w-6 h-6" /> Ajouter
          </button>
        </div>
        <div className="grid gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {personas.map(persona => (
            <div className="flex flex-col p-4 rounded bg-slate-300 dark:bg-slate-900">
              <div className="flex items-start justify-between flex-grow">
                <h3 className="text-lg font-bold dark:text-slate-50">
                  {persona.name}
                </h3>
                <button
                  onClick={() => {
                    dispatch({ type: "edit", payload: persona });
                  }}
                >
                  <SwatchIcon className="flex-shrink-0 w-6 h-6 text-teal-300 dark:text-teal-300" />
                </button>
              </div>
              <p className="mt-1 line-clamp-3 text-slate-600 dark:text-slate-300">
                {persona.description}
              </p>
            </div>
          ))}
        </div>
        <pre className="font-mono text-xs text-slate-600 dark:text-slate-300">
          {JSON.stringify(state)}
        </pre>
      </div>
      <SlideOver
        open={state.action === "create"}
        setOpen={() => dispatch({ type: "reset" })}
        title="Ajouter un personae"
      >
        <CreatePersonaForm
          projectId={projectId}
          onSuccess={() => dispatch({ type: "reset" })}
          onCanceled={() => dispatch({ type: "reset" })}
        />
      </SlideOver>

      <SlideOver
        open={state.action === "edit"}
        setOpen={() => dispatch({ type: "reset" })}
        title="Modifier un personae"
      >
        <UpdatePersonaForm
          initialValues={state.selectedPersona}
          onSuccess={() => dispatch({ type: "reset" })}
          onCanceled={() => dispatch({ type: "reset" })}
        />
      </SlideOver>
    </div>
  );
};
