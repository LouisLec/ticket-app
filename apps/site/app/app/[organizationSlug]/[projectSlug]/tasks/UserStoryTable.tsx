"use client";

import { GetProjectByIdQuery } from "@ticketApp/codegen";
import { FC } from "react";

export const UserStoryTable: FC<
  ExtractArrayType<
    ExtractArrayType<ExtractType<GetProjectByIdQuery, "project">, "epicsList">,
    "userStoriesList"
  >
> = ({ ...userStory }) => {
  return (
    <>
      <article id={"user-story-" + userStory.id} className="text-xs">
        <table>
          <tbody>
            <tr>
              <td className="px-4 font-mono font-bold text-end text-slate-400 dark:text-slate-600">
                en tant que
              </td>
              <td className="text-left">
                {userStory.personaByAsA?.name || "N/A"}
              </td>
            </tr>
            <tr>
              <td className="px-4 font-mono font-bold text-end text-slate-400 dark:text-slate-600">
                je veux
              </td>
              <td className="text-left">{userStory.iWant || "N/A"}</td>
            </tr>
            <tr>
              <td className="px-4 font-mono font-bold text-end text-slate-400 dark:text-slate-600">
                pour
              </td>
              <td className="text-left">{userStory.soThat || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </article>{" "}
    </>
  );
};
