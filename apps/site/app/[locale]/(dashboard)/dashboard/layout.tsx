import { DashboardNav } from "@/components/dashboard-nav";
import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { OrganizationPicker } from "@/components/organization-picker";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { sdk } from "@/utils/sdk/sdk";

import { cookies } from "next/headers";
import Link from "next/link";

const notifications = [
  {
    id: 1,
    title: "New comment on your post",
    description: "Someone left a comment on your post.",
    date: "2d",
  },
  {
    id: 2,
    title: "New follower",
    description: "Someone is following you.",
    date: "2d",
  },
  {
    id: 3,
    title: "New lead",
    description: "Romain created a new lead.",
    date: "2d",
  },
  {
    id: 4,
    title: "You've been assigned a task",
    description: "You've been assigned a task.",
    date: "2d",
  },
  {
    id: 5,
    title: "New comment on your post",
    description: "Someone left a comment on your post.",
    date: "2d",
  },
  {
    id: 6,
    title: "New follower",
    description: "Someone is following you.",
    date: "2d",
  },
];

const DashboardLayout = async ({ children }) => {
  const nextCookies = cookies();
  const jwt = nextCookies.get("jwt");
  const currentUser = await sdk({
    ...(jwt?.value
      ? { headers: { authorization: `bearer ${jwt.value}` } }
      : {}),
  }).GetCurrentUser();

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden">
        <header className="w-full border-b border-b-slate-200 dark:border-b-slate-700">
          <div className="container flex items-center h-16 mx-auto space-x-4 sm:justify-between sm:space-x-0">
            <DashboardNav items={docsConfig.mainNav} />
            <div className="flex items-center justify-end flex-1 space-x-4">
              <nav className="flex items-center space-x-1">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                      className: "text-slate-700 dark:text-slate-400",
                    })}
                  >
                    <Icons.gitHub className="w-5 h-5 fill-current" />
                    <span className="sr-only">LocalizedLinkedIn</span>
                  </div>
                </Link>
                <ModeToggle />
                <OrganizationPicker
                  organizations={currentUser?.currentUser?.organizationMemberships.nodes?.map(
                    org => {
                      return {
                        organization: org.organization,
                      };
                    }
                  )}
                />
              </nav>
            </div>
          </div>
        </header>
        <div className="flex h-[calc(100%-4rem)]">
          <div className="bg-red-500/50">
            {/* faire ici un fil d'actualité */}
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between px-4 py-2 border-b border-b-slate-200 dark:border-b-slate-700">
                <h2 className="text-xl font-cal">Notifications</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div
                      className={buttonVariants({
                        size: "sm",
                        variant: "ghost",
                        className: "text-slate-700 dark:text-slate-400",
                      })}
                    >
                      <Icons.droplets className="w-5 h-5 fill-current" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <div className="py-1">
                      <DropdownMenuItem>
                        <span>Mark all as read</span>
                        <Icons.check className="w-5 h-5 fill-current" />
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col flex-1">
                <ScrollArea>
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className="flex items-center justify-between px-4 py-2 border-b border-b-slate-200 dark:border-b-slate-700"
                    >
                      <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-400">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-400">
                          {notification.description}
                        </p>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-400">
                        {notification.date}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
            <ScrollArea>{children}</ScrollArea>
          </div>
          {/* footer */}
        </div>
      </div>
    </>
  );
};
export default DashboardLayout;
