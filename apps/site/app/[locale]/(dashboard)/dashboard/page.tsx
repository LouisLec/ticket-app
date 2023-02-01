import { cookies } from "next/headers";
import { LocalizedLink, useTranslations } from "next-intl";
import { sdk } from "@/utils/sdk";

const DashboardPage = async () => {
  const t = useTranslations("Dashboard");
  const nextCookies = cookies();
  const jwt = nextCookies.get("jwt");
  const { currentUser } = await sdk({
    ...(jwt?.value
      ? { headers: { authorization: `bearer ${jwt.value}` } }
      : {}),
  }).GetCurrentUser();

  return (
    <div>
      <h1>{t("greeting", { name: currentUser?.firstname })}</h1>
      <p>{t("dashboard.description")}</p>
    </div>
  );
};
export default DashboardPage;
