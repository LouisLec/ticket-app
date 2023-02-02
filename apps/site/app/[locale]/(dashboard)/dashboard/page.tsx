import { getCurrentUser } from "@/utils/getCurrentUser";
import { sdk } from "@/utils/sdk";
import { translate } from "@/utils/t";
import { cookies } from "next/headers";

const DashboardPage = async ({ params: { locale } }) => {
  const { currentUser } = await getCurrentUser();

  const t = (key, values = {}) => translate(locale, key, values, "Dashboard");
  return (
    <div>
      <h1>{t("greeting", { name: currentUser?.firstname })}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
export default DashboardPage;
