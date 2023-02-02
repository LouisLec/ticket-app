import { signedSdk } from "@/utils/sdk/signedSdk";
import { translate } from "@/utils/t";

const DashboardPage = async ({ params: { locale } }) => {
  const { currentUser } = await signedSdk().GetCurrentUser();

  const t = (key, values = {}) => translate(locale, key, values, "Dashboard");
  return (
    <div>
      <h1>{t("greeting", { name: currentUser?.firstname })}</h1>
      <p>{t("description")}</p>
      <div className="bg-red-300 border-4">
        Ici je veux afficher la liste des organizatins de l'user, idealement
        dans un menu en header à la Stripe par exemple
        <div>
          <h2 className="text-xl font-cal">mon espace personnel</h2>
          <div>{currentUser?.personalOrganization?.name}</div>
          <h2 className="text-xl font-cal">Mes organisations</h2>
          {currentUser?.organizationMemberships?.nodes?.map(org => (
            <div key={org.id}>
              <div>{org.organization.name}</div>
              <div>{org.organization.id}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
