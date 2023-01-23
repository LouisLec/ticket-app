"use client";

import { Typography } from "@/ui/server/typography";
import { cn } from "@/utils/classes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
const tabs = (slug: string) => [
  { name: "présentation", href: slug + "" },
  { name: "configuration", href: slug + "/config" },
  { name: "Taches", href: slug + "/tasks" },
  { name: "Architecture", href: slug + "/archi" },
  { name: "Hebergement", href: slug + "/hosting" },
  { name: "devis", href: slug + "/devis" },
  {
    name: "documents",
    href: slug + "/documents",
  },
  { name: "pilote auto", href: slug + "/pilote-auto" },
];
export const Tabs: FC<{ slug: string }> = ({ slug }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="mt-3 sm:mt-4">
      <div className="sm:hidden">
        <select
          id="current-tab"
          name="current-tab"
          onChange={e =>
            router.push(
              tabs(slug).find(tab => tab.name === e.target.value).href
            )
          }
          className="block w-full py-2 pl-3 pr-10 text-base rounded-md border-slate-300 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
        >
          {tabs(slug).map(tab => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex -mb-px space-x-8">
          {tabs(slug).map((tab, index) => {
            const isCurrent = pathname === tab.href;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                aria-current={isCurrent ? "page" : undefined}
                className={isCurrent ? "font-bold" : "no-underline"}
              >
                <Typography
                  style="upper-detail"
                  soften={isCurrent}
                  className={cn(
                    isCurrent
                      ? "border-teal-500 text-teal-600 "
                      : "border-transparent  ",
                    "whitespace-nowrap px-1 border-b-2"
                  )}
                >
                  {tab.name}
                </Typography>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
