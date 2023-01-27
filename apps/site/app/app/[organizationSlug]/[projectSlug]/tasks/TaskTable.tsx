"use client";

import {
  PencilIcon,
  PlusSmallIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { GetProjectByIdQuery, TaskStatus } from "@ticketApp/codegen";
import { FC, useState, useTransition } from "react";

import { sdk } from "utils/sdk";
import { Typography } from "@/ui/server/typography";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  LinkIcon,
} from "@heroicons/react/20/solid";
import { cn } from "@/utils/classes";
import { useRouter } from "next/navigation";

export const TaskTable: FC<
  ExtractArrayType<
    ExtractArrayType<ExtractType<GetProjectByIdQuery, "project">, "epicsList">,
    "userStoriesList"
  > & {
    dispatch: any;
  }
> = ({ dispatch, ...userStory }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div
      className={cn(
        isTransitioning || isLoading ? "animate-pulse pointer-events-none" : ""
      )}
    >
      {userStory.tasksList.length ? (
        <table className="w-full table-auto">
          <thead>
            <tr className="odd:bg-slate-200 bg-slate-50 dark:bg-slate-900 odd:dark:bg-slate-800 ">
              <th className="border border-slate-300 dark:border-slate-700">
                <span className="sr-only">Actions</span>
              </th>
              <th className="px-2 py-1 font-mono text-xs text-left border border-slate-300 dark:border-slate-700">
                Task name
              </th>
              <th className="px-2 py-1 font-mono text-xs text-left border border-slate-300 dark:border-slate-700">
                Estimate
              </th>
              <th className="px-2 py-1 font-mono text-xs text-left border border-slate-300 dark:border-slate-700">
                Uncertainty
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
                      onClick={() => dispatch({ type: "edit", payload: task })}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 rounded-full hover:bg-slate-100"
                      onClick={() => {
                        setIsLoading(true);
                        window.confirm(
                          "Are you sure you want to delete this?"
                        ) && sdk().DeleteTask({ input: { id: task.id } });
                        setIsLoading(false);
                        startTransition(() => {
                          router.refresh();
                        });
                      }}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                    <div className="grid">
                      <button
                        onClick={() => {
                          setIsLoading(true);
                          sdk().UpdateTask({
                            input: {
                              id: task.id,
                              patch: { order: task.order - 1 },
                            },
                          });
                          setIsLoading(false);
                          startTransition(() => {
                            router.refresh();
                          });
                        }}
                        disabled={task.order === 0}
                      >
                        <ArrowUpIcon
                          className={cn(
                            "w-3 h-3",
                            task.order === 0 && "opacity-20"
                          )}
                        />
                      </button>
                      <button
                        onClick={() => {
                          setIsLoading(true);
                          sdk().UpdateTask({
                            input: {
                              id: task.id,
                              patch: { order: task.order + 1 },
                            },
                          });
                          setIsLoading(false);
                          startTransition(() => {
                            router.refresh();
                          });
                        }}
                        disabled={task.order === userStory.tasksList.length - 1}
                      >
                        <ArrowDownIcon
                          className={cn(
                            "w-3 h-3",
                            task.order === userStory.tasksList.length - 1 &&
                              "opacity-20"
                          )}
                        />
                      </button>
                    </div>
                  </div>
                </td>

                <td className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-700 ">
                  {task.name}
                  {task.parentId ? (
                    <Typography
                      as="div"
                      style="super-small"
                      soften
                      className="flex items-baseline gap-px"
                    >
                      <LinkIcon className="w-3 h-3 " />{" "}
                      <Typography as="strong" style="strong">
                        {
                          userStory.tasksList.find(t => t.id === task.parentId)
                            ?.name
                        }
                      </Typography>
                    </Typography>
                  ) : null}
                </td>

                <td className="px-2 py-1 text-sm text-right border border-slate-300 dark:border-slate-700 ">
                  {task.estimate}
                </td>
                <td className="px-2 py-1 text-sm text-right border border-slate-300 dark:border-slate-700 ">
                  {task.uncertainty}
                </td>
                <td className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-700">
                  <div className="flex items-baseline gap-1 ">
                    {task.status === TaskStatus.Backlog ? (
                      <div className="w-2 h-2 bg-gray-400 rounded-full shadow shadow-gray-400" />
                    ) : task.status === TaskStatus.InProgress ? (
                      <div className="w-2 h-2 bg-yellow-400 rounded-full shadow shadow-yellow-400" />
                    ) : task.status === TaskStatus.Done ? (
                      <div className="w-2 h-2 bg-green-400 rounded-full shadow shadow-green-400" />
                    ) : task.status === TaskStatus.Blocked ? (
                      <div className="w-2 h-2 bg-red-400 rounded-full shadow shadow-red-400" />
                    ) : task.status === TaskStatus.Review ? (
                      <div className="w-2 h-2 bg-blue-400 rounded-full shadow shadow-blue-400" />
                    ) : task.status === TaskStatus.Deleted ? (
                      <div className="w-2 h-2 bg-gray-400 border border-red-500 rounded-full shadow shadow-gray-400" />
                    ) : null}
                    <Typography style="super-small" className="font-mono">
                      {task.status}
                    </Typography>
                  </div>
                </td>
                <td className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-700 ">
                  <span
                    className="rounded border-2 px-1 py-0.5 text-xs font-mono"
                    style={{ borderColor: task?.domain?.color }}
                  >
                    {task?.domain?.name}
                  </span>
                </td>
                <td className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-700 ">
                  {task.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <Typography style="code">Pas encore de tâches</Typography>
        </>
      )}
    </div>
  );
};
