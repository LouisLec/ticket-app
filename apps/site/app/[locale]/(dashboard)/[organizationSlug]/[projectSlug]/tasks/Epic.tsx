"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import { GetProjectByIdQuery, TaskStatus } from "@ticketApp/codegen";
import { FC, useReducer } from "react";

import { Typography } from "@/ui/server/typography";
import { UserStory } from "./UserStory";
import { SlideOver } from "@/ui/client/slideOver";
import {
  createUserStoryFormProps,
  updateUserStoryFormProps,
} from "./userStoryForm";
import { GenericForm } from "@/components/genericForm";
import { sdk } from "@/utils/sdk/sdk";

interface UserStoryState {
  isEditing: boolean;
  selectedUserStory: null | ExtractArrayType<
    ExtractArrayType<ExtractType<GetProjectByIdQuery, "project">, "epicsList">,
    "userStoriesList"
  >;
  action: null | "edit" | "create" | "delete";
}

interface UserStoryEvent {
  type: "edit" | "create" | "reset" | "delete";
  payload: ExtractArrayType<
    ExtractArrayType<ExtractType<GetProjectByIdQuery, "project">, "epicsList">,
    "userStoriesList"
  > | null;
}

export const Epic: FC<
  ExtractArrayType<ExtractType<GetProjectByIdQuery, "project">, "epicsList"> & {
    domains: ExtractType<
      ExtractType<GetProjectByIdQuery, "project">,
      "domainsList"
    >;
  } & {
    personas: ExtractType<
      ExtractType<GetProjectByIdQuery, "project">,
      "personasList"
    >;
  }
> = ({ description, name, id, userStoriesList, domains, personas }) => {
  const [state, dispatch] = useReducer(
    (state: UserStoryState, event: UserStoryEvent) => {
      switch (event.type) {
        case "edit":
          return { ...state, selectedUserStory: event.payload, action: "edit" };
        case "create":
          return { ...state, selectedUserStory: null, action: "create" };
        case "reset":
          return { ...state, selectedUserStory: null, action: null };
        case "delete":
          return {
            ...state,
            selectedUserStory: event.payload,
            action: "delete",
          };

        default:
          throw new Error();
      }
    },
    { isEditing: false, selectedUserStory: null, action: null }
  );
  return (
    <>
      <Disclosure defaultOpen as="div" className="flex flex-col gap-2 mb-12">
        {({ open }) => (
          <>
            <div className="flex items-center w-full max-w-5xl gap-2 mx-auto items-between">
              <Typography>
                <ChevronRightIcon
                  className={
                    "w-4 h-4 transition-all  transform " +
                    (open ? "rotate-90" : "rotate-0")
                  }
                />
              </Typography>
              <div className="text-start">
                <Disclosure.Button className="block w-full text-left">
                  <Typography style="strong" as="h3">
                    {name}
                  </Typography>
                  <Typography style="small" as="p">
                    {description}
                  </Typography>
                </Disclosure.Button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-2 py-1 mt-4 text-sm font-bold underline bg-teal-200 decoration-offset decoration-2 dark:bg-transparent dark:p-0 dark:text-teal-300 dark:border-teal-300"
                  onClick={() => {
                    dispatch({ payload: null, type: "create" });
                  }}
                >
                  <SquaresPlusIcon className="w-4 h-4 " /> Ajouter une US
                </button>
              </div>
            </div>

            {/* <pre>{JSON.stringify(epic, null, 2)}</pre> */}
            <Disclosure.Panel className="flex flex-col mt-8 ">
              <div className="w-full max-w-5xl mx-auto"></div>
              {userStoriesList?.map(userStory => (
                <UserStory
                  dispatchUS={dispatch}
                  domains={domains}
                  key={userStory.id}
                  {...userStory}
                />
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <SlideOver
        title={""}
        open={state.action === "create" || state.action === "edit"}
        setOpen={() => dispatch({ type: "reset", payload: null })}
      >
        <GenericForm
          onCanceled={() => dispatch({ type: "reset", payload: null })}
          onDelete={() =>
            window.confirm(
              "Are you sure you want to delete " +
                state.selectedUserStory.name +
                "?"
            ) &&
            sdk().DeleteUserStory({
              input: { id: state.selectedUserStory.id },
            })
          }
          onSuccess={() => dispatch({ type: "reset", payload: null })}
          {...(state.action === "edit"
            ? {
                ...updateUserStoryFormProps({
                  existingUserStorys: userStoriesList,
                  userStory: state.selectedUserStory,
                  personas,
                }),
              }
            : {
                ...createUserStoryFormProps({
                  existingUserStorys: userStoriesList,
                  epicId: id,
                  personas,
                }),
              })}
        />
      </SlideOver>
    </>
  );
};
