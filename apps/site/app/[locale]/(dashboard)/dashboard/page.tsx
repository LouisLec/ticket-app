import { sdk } from "@/utils/sdk/sdk";
import { translate } from "@/utils/t";

const DashboardPage = async ({ params: { locale } }) => {
  const { currentUser } = await sdk().GetCurrentUser();

  const t = (key, values = {}) => translate(locale, key, values, "Dashboard");
  return (
    <div>
      <h1>{t("greeting", { name: currentUser?.firstname })}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
export default DashboardPage;
