import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { docsConfig } from "@/config/docs";
import { LocalizedLink } from "next-intl";

export function SiteHeader({ isAuth = false }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-b-slate-200 dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={docsConfig.mainNav} />
        <div className="flex items-center justify-end flex-1 space-x-4">
          <nav className="flex items-center space-x-1">
            <LocalizedLink
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
            </LocalizedLink>
            <ModeToggle />
            {isAuth ? (
              <LocalizedLink href={siteConfig.links.dashboard}>
                <div
                  className={buttonVariants({
                    size: "sm",
                    variant: "outline",
                    className: "text-slate-700 dark:text-slate-400",
                  })}
                >
                  <Icons.user className="w-5 h-5 fill-current" />
                  <span>Dashboard</span>
                </div>
              </LocalizedLink>
            ) : (
              <LocalizedLink href={siteConfig.links.signin}>
                <div
                  className={buttonVariants({
                    size: "sm",
                    variant: "outline",
                    className: "text-slate-700 dark:text-slate-400",
                  })}
                >
                  <Icons.sign className="w-5 h-5 fill-current" />
                  <span>Sign in</span>
                </div>
              </LocalizedLink>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
// q: how to remove git from my repo ?
// a: https://stackoverflow.com/questions/13716658/how-to-delete-all-commit-history-in-github
// q: how to remove git from my repo ?
