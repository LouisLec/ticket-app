import { DashboardNav } from "@/components/dashboard-nav";
import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { OrganizationPicker } from "@/components/organization-picker";
import { buttonVariants } from "@/components/ui/button";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { sdk } from "@/utils/sdk/sdk";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { cookies } from "next/headers";
import Link from "next/link";

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
      <div className="flex flex-col min-h-screen ">
        <header className="w-full border-b border-b-slate-200 dark:border-b-slate-700">
          <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
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
        <div className="container flex-1">{children}</div>
        {/* footer */}
      </div>
    </>
  );
};
export default DashboardLayout;
