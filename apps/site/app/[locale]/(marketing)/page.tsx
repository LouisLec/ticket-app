import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/utils/classes";
import { translate } from "@/utils/t";
import { LocalizedLink, useTranslations } from "next-intl";
import { HeroSvg } from "./HeroSvg";

const LandingPage = async ({ params: { locale } }) => {
  const t = (key, values = {}) => translate(locale, key, values, "Index");
  return (
    <>
      <section className="container flex flex-col items-center gap-6 pt-6 pb-8 md:flex-row-reverse md:py-10">
        <div className="relative ">
          <div className="absolute inset-0 overflow-hidden rounded-full blur-2xl bg-slate-500/50" />

          <div className="relative">
            <HeroSvg />
          </div>
        </div>{" "}
        <div className="flex max-w-[980px] flex-col items-start gap-2 -mt-2 md:mt-12 ">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            {t("description")}
          </p>
        </div>
        <div className="flex-col items-stretch gap-4 sm:flex-row">
          <LocalizedLink
            href={siteConfig.links.signin}
            className={cn(buttonVariants({ size: "lg" }), "block")}
          >
            {t("getStarted")}
          </LocalizedLink>
          <LocalizedLink
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.dashboard}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "block"
            )}
          >
            {t("dashboardLink")}
          </LocalizedLink>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
