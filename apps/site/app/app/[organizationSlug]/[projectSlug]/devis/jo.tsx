"use client";

import { GetProjectBySlugQuery } from "@/../../@ticketApp/codegen/dist";
import React, { FC, useState } from "react";

const Epic: FC<{
  epic: ExtractArrayType<
    ExtractType<GetProjectBySlugQuery, "projectBySlug">,
    "epicsList"
  >;
}> = ({ epic }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <li>
      <div className="flex items-center cursor-pointer" onClick={toggle}>
        <span className="mr-2 text-xs">{epic.name}</span>
        <span className={`fas fa-caret-${isOpen ? "down" : "right"}`}></span>
      </div>
      {isOpen && (
        <ul className="ml-8">
          {epic.userStoriesList
            .filter(userStory => !userStory.parentId)
            .map(userStory => (
              <UserStory
                key={userStory.id}
                userStory={userStory}
                userStories={epic.userStoriesList}
              />
            ))}
        </ul>
      )}
    </li>
  );
};

const UserStory: FC<{
  userStory: ExtractArrayType<
    ExtractArrayType<
      ExtractType<GetProjectBySlugQuery, "projectBySlug">,
      "epicsList"
    >,
    "userStoriesList"
  >;
  userStories: ExtractType<
    ExtractArrayType<
      ExtractType<GetProjectBySlugQuery, "projectBySlug">,
      "epicsList"
    >,
    "userStoriesList"
  >;
}> = ({ userStory, userStories }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <li>
      <div className="flex items-center cursor-pointer" onClick={toggle}>
        <span className="mr-2 text-xs">{userStory.name}</span>
        <span className={`fas fa-caret-${isOpen ? "down" : "right"}`}></span>
      </div>
      {isOpen && (
        <>
          <ul className="ml-8">
            {userStory.tasksList.map(task => (
              <Task key={task.id} task={task} />
            ))}
          </ul>
          <ul className="ml-8">
            {userStories
              .filter(us => us.parentId === userStory.id)
              .map(us => (
                <UserStory
                  key={us.id}
                  userStory={us}
                  userStories={userStories}
                />
              ))}
          </ul>
        </>
      )}
    </li>
  );
};

function Task({ task }) {
  return <li>{task.name}</li>;
}

export const ProjectDiagram: FC<{
  epics: ExtractType<
    ExtractType<GetProjectBySlugQuery, "projectBySlug">,
    "epicsList"
  >;
}> = ({ epics }) => {
  return (
    <pre>
      <ul className="">
        {epics.map(epic => (
          <Epic key={epic.id} epic={epic} />
        ))}
      </ul>
    </pre>
  );
};
