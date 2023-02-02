import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/classes";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { translate } from "@/utils/t";
import { LocalizedLink } from "next-intl";

const SignInPage = async ({ params: { locale } }) => {
  const { currentUser } = await getCurrentUser();
  const t = (key, values = {}) => translate(locale, key, values, "Signin");

  /* if (currentUser) {
    return (
      <div className="bg-red-200 h-96 w-96">
        <LocalizedLink
          href="/app/the-organisation/canto/tasks"
          className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
        >
          Go to app
        </LocalizedLink>
      </div>
    );
  } */

  return (
    <div>
      <h1>{t("greeting", { name: currentUser?.firstname })}</h1>
      <p>{t("description")}</p>
      <div>
        <LocalizedLink href="/signup">{t("createAccount")}</LocalizedLink>
        <LocalizedLink href="/forgot-password">
          {t("forgotPassword")}
        </LocalizedLink>
      </div>
    </div>
  );
};

export default SignInPage;
