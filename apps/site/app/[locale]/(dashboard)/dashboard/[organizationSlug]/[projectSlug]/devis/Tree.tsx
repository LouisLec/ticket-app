"use client";

import { GetProjectBySlugQuery } from "@/../../@ticketApp/codegen/dist";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { FC, useState } from "react";

const Epic: FC<{
  epic: MyEpic;
  isLast: boolean;
  showTasks?: boolean;
}> = ({ epic, isLast, showTasks }) => {
  return (
    <li>
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center gap-2 text-xs text-left hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span className="text-base ">
                {isLast ? "└─" : "├─"}
                {open ? "┬" : "─"}
              </span>
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } w-3 h-3 bg-amber-800 border border-amber-700 shadow shadow-amber-400 rounded-full`}
              />

              {epic.name}
            </Disclosure.Button>
            <Disclosure.Panel className="" as="ul">
              {epic.userStoriesList.map(userStory => (
                <UserStory
                  key={userStory.id}
                  userStory={userStory}
                  userStories={epic.userStoriesList}
                  level={1}
                  showTasks={showTasks}
                  isLast={
                    epic.userStoriesList.indexOf(userStory) ===
                    epic.userStoriesList.length - 1
                  }
                />
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </li>
  );
};

const UserStory: FC<{
  userStory: MyUserStory;
  userStories: MyUserStory[];
  level: number;
  isLast: boolean;
  showTasks?: boolean;
}> = ({ userStory, userStories, level, isLast, showTasks }) => {
  return (
    <li>
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center gap-2 text-xs font-medium text-left hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span className="text-base ">
                {"│  ".repeat(level)}
                {isLast ? "└─" : "├─"}
                {open ? "┬" : "─"}
              </span>
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } w-3 h-3 bg-pink-800 border border-pink-700 shadow shadow-pink-400 rounded-full `}
              />

              {userStory.name}
            </Disclosure.Button>
            <Disclosure.Panel className="text-sm ">
              {showTasks &&
                userStory.tasksList.map(task => (
                  <Task
                    key={task.id}
                    tasks={userStory.tasksList}
                    task={task}
                    level={level + 1}
                    isLast={
                      userStory.tasksList.indexOf(task) ===
                      userStory.tasksList.length - 1
                    }
                  />
                ))}
              <ul>
                {userStories
                  .filter(us => us.parentId === userStory.id)
                  .map(us => (
                    <UserStory
                      key={us.id}
                      userStory={us}
                      userStories={userStories}
                      level={level + 1}
                      isLast={false}
                      showTasks={showTasks}
                    />
                  ))}
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </li>
  );
};

const Task: FC<{
  task: MyTask;
  tasks: MyTask[];
  level: number;
  isLast: boolean;
}> = ({ task, tasks, level, isLast }) => {
  return (
    <li>
      {tasks.length > 0 ? (
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-center gap-2 text-xs font-medium text-left hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span className="text-base ">
                  {"│  ".repeat(level)}
                  {isLast ? "└─" : "├─"}
                  {open ? "┬" : "─"}
                </span>
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-3 h-3 bg-lime-800 border border-lime-700 shadow shadow-lime-400 rounded-full `}
                />

                {task.name}
              </Disclosure.Button>
              <Disclosure.Panel className="text-sm ">
                {tasks.map(task => (
                  <Task
                    isLast={tasks.indexOf(task) === tasks.length - 1}
                    key={task.id}
                    tasks={tasks.filter(t => t.parentId === task.id)}
                    task={task}
                    level={level + 1}
                  />
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ) : (
        <div className="flex items-center gap-2 text-xs font-medium text-left hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
          <span className="text-base ">
            {"│  ".repeat(level)}
            {isLast ? "└─" : "├─"}
            {"─"}
          </span>
          <div className="w-3 h-3 border rounded-full shadow bg-lime-800 border-lime-700 shadow-lime-400" />

          {task.name}
        </div>
      )}
    </li>
  );
};

export const ProjectDiagram: FC<{
  epics: MyEpic[];
  projectName: string;
}> = ({ epics, projectName }) => {
  const [showTasks, setShowTasks] = useState(false);
  return (
    <>
      <button
        className="px-2 py-1 text-xs text-white border rounded-md bg:slate-800 hover:bg:slate-700 border-slate-900"
        onClick={() => setShowTasks(!showTasks)}
      >
        {showTasks ? "Hide tasks" : "Show tasks"}
      </button>
      <ul className="mt-6">
        @{projectName}
        {epics.map(epic => (
          <Epic
            showTasks={showTasks}
            key={epic.id}
            epic={epic}
            isLast={epics.indexOf(epic) === epics.length - 1}
          />
        ))}
      </ul>
    </>
  );
};

type MyTask = ExtractArrayType<
  ExtractArrayType<
    ExtractArrayType<
      ExtractType<GetProjectBySlugQuery, "projectBySlug">,
      "epicsList"
    >,
    "userStoriesList"
  >,
  "tasksList"
>;

type MyUserStory = ExtractArrayType<
  ExtractArrayType<
    ExtractType<GetProjectBySlugQuery, "projectBySlug">,
    "epicsList"
  >,
  "userStoriesList"
>;

type MyEpic = ExtractArrayType<
  ExtractType<GetProjectBySlugQuery, "projectBySlug">,
  "epicsList"
>;
