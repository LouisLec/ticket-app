"use client";

import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  CogIcon,
  PencilIcon,
  PlusSmallIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { GetProjectByIdQuery, TaskStatus } from "@ticketApp/codegen";
import { FC, useReducer, useState, useTransition } from "react";
import { GenericForm } from "@/components/index";
import { SlideOver } from "@/ui/client/slideOver";

import { sdk } from "utils/sdk";
import { createTaskFormProps, updateTaskFormProps } from "./taskForms";

import { UserStoryTable } from "./UserStoryTable";
import { TaskTable } from "./TaskTable";
import { Disclosure } from "@headlessui/react";
import { useRouter } from "next/navigation";

interface TaskState {
  isEditing: boolean;
  selectedTask: null | ExtractArrayType<
    ExtractArrayType<
      ExtractArrayType<
        ExtractType<GetProjectByIdQuery, "project">,
        "epicsList"
      >,
      "userStoriesList"
    >,
    "tasksList"
  >;
  action: null | "edit" | "create" | "delete";
}

interface TaskEvent {
  type: "edit" | "create" | "reset" | "delete";
  payload: ExtractArrayType<
    ExtractArrayType<
      ExtractArrayType<
        ExtractType<GetProjectByIdQuery, "project">,
        "epicsList"
      >,
      "userStoriesList"
    >,
    "tasksList"
  > | null;
}

export const UserStory: FC<
  ExtractArrayType<
    ExtractArrayType<ExtractType<GetProjectByIdQuery, "project">, "epicsList">,
    "userStoriesList"
  > & {
    domains: ExtractType<
      ExtractType<GetProjectByIdQuery, "project">,
      "domainsList"
    >;
    dispatchUS: React.Dispatch<any>;
  }
> = ({ domains, dispatchUS, ...userStory }) => {
  const [state, dispatch] = useReducer(
    (state: TaskState, event: TaskEvent) => {
      switch (event.type) {
        case "edit":
          return { ...state, selectedTask: event.payload, action: "edit" };
        case "create":
          return { ...state, selectedTask: null, action: "create" };
        case "reset":
          return { ...state, selectedTask: null, action: null };
        case "delete":
          return { ...state, selectedTask: event.payload, action: "delete" };

        default:
          throw new Error();
      }
    },
    { isEditing: false, selectedTask: null, action: null }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, startTransition] = useTransition();
  const router = useRouter();

  return (
    <>
      <Disclosure
        as="div"
        className="flex items-stretch w-full max-w-6xl gap-2 mx-auto text-slate-600 dark:text-slate-300"
      >
        <>
          <div className="flex flex-col items-center ">
            <div className="w-4 h-4 border-2 border-transparent rounded-full bg-cyan-500" />
            <div className="flex-grow w-1 bg-gradient-to-b from-cyan-500 to-teal-500" />
          </div>
          <div className="flex-grow ">
            <div className="flex justify-between">
              <Disclosure.Button>
                <UserStoryTable {...userStory} />
              </Disclosure.Button>
              <div className="flex gap-2">
                <button
                  className="p-1 rounded-full hover:bg-slate-100"
                  type="button"
                  onClick={() =>
                    dispatchUS({ type: "edit", payload: userStory })
                  }
                >
                  <CogIcon className="w-6 h-6 opacity-60" />
                </button>
                <button
                  className="p-1 rounded-full hover:bg-slate-100"
                  type="button"
                  onClick={async () => {
                    setIsLoading(true);
                    await sdk().UpdateUserStory({
                      input: {
                        id: userStory.id,
                        patch: { order: userStory.order - 1 },
                      },
                    });
                    setIsLoading(false);
                    startTransition(() => {
                      router.refresh();
                    });
                  }}
                >
                  <ArrowUpCircleIcon
                    className="w-6 h-6 opacity-60"
                    type="button"
                    onClick={async () => {
                      setIsLoading(true);
                      await sdk().UpdateUserStory({
                        input: {
                          id: userStory.id,
                          patch: { order: userStory.order + 1 },
                        },
                      });
                      setIsLoading(false);
                      startTransition(() => {
                        router.refresh();
                      });
                    }}
                  />
                </button>
                <button className="p-1 rounded-full hover:bg-slate-100">
                  <ArrowDownCircleIcon className="w-6 h-6 opacity-60" />
                </button>
              </div>
            </div>{" "}
            <div className="flex items-baseline gap-2 mt-4">
              <div className="text-xs text-slate-800 dark:text-slate-400">
                <strong className="font-bold">
                  {userStory?.tasksList?.length}{" "}
                </strong>
                tasks. Total estimate:{" "}
                <strong className="font-bold">
                  {userStory?.tasksList?.reduce(
                    (acc, task) => acc + task.estimate,
                    0
                  )}{" "}
                  points
                </strong>
              </div>

              <button
                className="px-1 dark:bg-slate-900 dark:hover:bg-slate-800 inline-flex gap-1 py-0.5 font-cal text-xs tracking-wide uppercase rounded bg-slate-200 text-slate-600"
                onClick={() => dispatch({ type: "create", payload: null })}
              >
                <PlusSmallIcon className="w-4 h-4 " />
                Add task
              </button>
            </div>
            <Disclosure.Panel className={"mt-2"}>
              <TaskTable {...userStory} dispatch={dispatch} />
            </Disclosure.Panel>
            <div className="h-20" />
          </div>
        </>{" "}
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
              "Are you sure you want to delete " + state.selectedTask.name + "?"
            ) && sdk().DeleteTask({ input: { id: state.selectedTask.id } })
          }
          onSuccess={() => dispatch({ type: "reset", payload: null })}
          {...(state.action === "edit"
            ? {
                ...updateTaskFormProps({
                  existingTasks: userStory.tasksList,
                  domains: domains,
                  task: state.selectedTask,
                }),
              }
            : {
                ...createTaskFormProps({
                  existingTasks: userStory.tasksList,
                  domains: domains,
                  userStoryId: userStory.id,
                }),
              })}
        />
      </SlideOver>
    </>
  );
};
