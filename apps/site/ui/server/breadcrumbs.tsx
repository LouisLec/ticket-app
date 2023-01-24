import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { FC } from "react";
import { Typography } from "./typography";

export const Breadcrumbs: FC<{
  pages: { name: string; slug: string }[];
}> = ({ pages }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {pages.map((page, index, array) => (
          <li key={page.name}>
            <Typography style="super-small" as="div" className="flex gap-1">
              {" "}
              <ChevronRightIcon
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
              />
              <Link
                href={
                  // get the slug of the link, by concatenating previous elements slug
                  // and the current element slug
                  array
                    .slice(0, index + 1)
                    ?.map(({ slug }) => slug)
                    .join("/")
                }
                aria-current={index === array.length - 1 ? "page" : undefined}
              >
                {page.name}
              </Link>
            </Typography>
          </li>
        ))}
      </ol>
    </nav>
  );
};
