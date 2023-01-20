"use client";

import { Disclosure } from "@headlessui/react";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  ChevronRightIcon,
  CogIcon,
  PencilIcon,
  PlusCircleIcon,
  PlusSmallIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  EpicFragmentFragment,
  UserStoryFragmentFragment,
  TaskFragmentFragment,
  GetProjectByIdQuery,
} from "@ticketApp/codegen";
import { FC, useReducer } from "react";
import { GenericForm } from "@/components/index";
import { SlideOver } from "@/ui/client/slideOver";
import { createTaskFormProps, updateTaskFormProps } from "./forms/taskForms";
import { sdk } from "utils/sdk";

interface DetailedEpic extends EpicFragmentFragment {
  userStoriesList: DetailedUserStory[];
}

interface DetailedUserStory extends UserStoryFragmentFragment {
  tasksList: TaskFragmentFragment[];
}

export const EpicSection: FC<{
  projectId: string;
  epics: DetailedEpic[];
  domains: ExtractType<
    ExtractType<GetProjectByIdQuery, "project">,
    "domainsList"
  >;
}> = ({ epics, domains }) => {
  return (
    <section className="mt-8">
      <div className="flex flex-col gap-4">
        {epics.map(epic => (
          <Epic domains={domains} {...epic} key={epic.id} />
        ))}
      </div>
    </section>
  );
};

export const Epic: FC<
  DetailedEpic & {
    domains: ExtractType<
      ExtractType<GetProjectByIdQuery, "project">,
      "domainsList"
    >;
  }
> = ({ description, name, userStoriesList, domains }) => {
  return (
    <>
      <Disclosure as="div" className="flex flex-col gap-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center gap-2">
              <ChevronRightIcon
                className={
                  "w-4 h-4 transition-all transform " +
                  (open ? "rotate-90" : "rotate-0")
                }
              />
              <div className="text-start">
                <h4 className="text-xl font-cal">{name}</h4>
                <p className="text-xs text-slate-500">{description}</p>
              </div>
            </Disclosure.Button>

            {/* <pre>{JSON.stringify(epic, null, 2)}</pre> */}
            <Disclosure.Panel className="flex flex-col ">
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

/* 
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

*/

interface TaskState {
  isEditing: boolean;
  selectedTask: null | TaskFragmentFragment;
  action: null | "edit" | "create" | "delete";
}

interface TaskEvent {
  type: "edit" | "create" | "reset" | "delete";
  payload: TaskFragmentFragment | null;
}

const UserStory: FC<
  DetailedUserStory & {
    domains: ExtractType<
      ExtractType<GetProjectByIdQuery, "project">,
      "domainsList"
    >;
  }
> = ({ domains, ...userStory }) => {
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
  return (
    <>
      <div
        key={userStory.id}
        className="flex items-stretch gap-2 text-slate-600 dark:text-slate-300"
      >
        <div className="flex flex-col items-center ">
          <div className="w-4 h-4 border-2 border-white rounded-full bg-cyan-500" />
          <div className="flex-grow w-1 bg-gradient-to-b from-cyan-500 to-teal-500" />
        </div>
        <div className="flex-grow ">
          <div className="flex justify-between">
            <article id={"user-story-" + userStory.id} className="text-xs">
              <table>
                <tbody>
                  <tr>
                    <td className="px-4 font-mono font-bold text-end text-slate-400 dark:text-slate-600">
                      en tant que
                    </td>
                    <td>{userStory.asA || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="px-4 font-mono font-bold text-end text-slate-400 dark:text-slate-600">
                      je veux
                    </td>
                    <td>{userStory.iWant || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="px-4 font-mono font-bold text-end text-slate-400 dark:text-slate-600">
                      pour
                    </td>
                    <td>{userStory.soThat || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </article>{" "}
            <div className="flex gap-2">
              <button className="p-1 rounded-full hover:bg-slate-100">
                <CogIcon className="w-6 h-6 opacity-60" />
              </button>
              <button className="p-1 rounded-full hover:bg-slate-100">
                <ArrowUpCircleIcon className="w-6 h-6 opacity-60" />
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
          {userStory.tasksList.length ? (
            <table className="w-full mt-2 table-auto">
              <thead>
                <tr className="odd:bg-slate-200 bg-slate-50 dark:bg-slate-900 odd:dark:bg-slate-800 ">
                  <th className="border border-slate-300 dark:border-slate-700">
                    <span className="sr-only">Actions</span>
                  </th>
                  <th className="px-2 py-1 font-mono text-xs text-left border border-slate-300 dark:border-slate-700">
                    Task name
                  </th>
                  <th className="px-2 py-1 font-mono text-xs text-left border border-slate-300 dark:border-slate-700">
                    Status
                  </th>
                  <th className="px-2 py-1 font-mono text-xs text-left border border-slate-300 dark:border-slate-700">
                    Domain{" "}
                  </th>
                  <th className="px-2 py-1 font-mono text-xs text-left border border-slate-300 dark:border-slate-700">
                    Description{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {userStory.tasksList?.map(task => (
                  <tr
                    className="odd:bg-slate-200 bg-slate-50 dark:bg-slate-800 odd:dark:bg-slate-900 "
                    key={task.id}
                  >
                    <td className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-700 ">
                      <div className="flex gap-2">
                        <button
                          className="p-1 rounded-full hover:bg-slate-100"
                          onClick={() =>
                            dispatch({ type: "edit", payload: task })
                          }
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 rounded-full hover:bg-slate-100"
                          onClick={() =>
                            window.confirm(
                              "Are you sure you want to delete this?"
                            ) && sdk.DeleteTask({ input: { id: task.id } })
                          }
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                    <td className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-700 ">
                      {task.name}
                    </td>
                    <td className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-700 ">
                      {task.status}
                    </td>
                    <td className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-700 ">
                      {task?.domain?.name}
                    </td>
                    <td className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-700 ">
                      {task.description} Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Eius, aut incidunt hic consequuntur non
                      voluptatibus amet sit ut eos molestiae dolores. Voluptatem
                      alias ea enim porro sed aliquam eos magnam!
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
          <div className="h-20" />
        </div>
      </div>{" "}
      <SlideOver
        title={""}
        open={state.action === "create" || state.action === "edit"}
        setOpen={() => dispatch({ type: "reset", payload: null })}
      >
        <GenericForm
          onCanceled={() => dispatch({ type: "reset", payload: null })}
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
