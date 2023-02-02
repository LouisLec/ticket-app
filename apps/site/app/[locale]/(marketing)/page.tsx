import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { translate } from "@/utils/t";
import { LocalizedLink, useTranslations } from "next-intl";
import { HeroSvg } from "./HeroSvg";

const LandingPage = async ({ params: { locale } }) => {
  const t = (key, values = {}) => translate(locale, key, values, "Index");
  return (
    <>
      <section className="container grid items-center grid-cols-2 gap-6 pt-6 pb-8 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            {t("description")}
          </p>
        </div>
        <div className="relative mt-12">
          <div className="absolute inset-0 rounded-full blur-2xl bg-slate-500/50" />

          <div className="relative">
            <HeroSvg />
          </div>
        </div>
        <div className="flex gap-4">
          <LocalizedLink
            href={siteConfig.links.signin}
            className={buttonVariants({ size: "lg" })}
          >
            {t("getStarted")}
          </LocalizedLink>
          <LocalizedLink
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.dashboard}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            {t("dashboardLink")}
          </LocalizedLink>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
