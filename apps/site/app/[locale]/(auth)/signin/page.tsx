import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/classes";
import { signedSdk } from "@/utils/sdk/signedSdk";

import { translate } from "@/utils/t";
import { LocalizedLink } from "next-intl";
import { LoginForm } from "./LoginForm";

const SignInPage = async ({ params: { locale } }) => {
  const { currentUser } = await signedSdk().GetCurrentUser();
  const t = (key, values = {}) => translate(locale, key, values, "Signin");

  if (currentUser) {
    return (
      <div className="bg-red-200 h-96 w-96">
        <h1>{t("greeting", { name: currentUser?.firstname })}</h1>
        <LocalizedLink
          href="/the-organisation/canto/tasks"
          className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
        >
          Go to app
        </LocalizedLink>
      </div>
    );
  }

  return (
    <div>
      <p>{t("description")}</p>
      <LoginForm />
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
