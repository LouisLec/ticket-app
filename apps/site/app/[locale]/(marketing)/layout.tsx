import { sdk } from "@/utils/sdk/sdk";
import { cookies } from "next/headers";
import { SiteHeader } from "./Header";

const MarkettingLayout = async ({ children }) => {
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
        <SiteHeader isAuth={currentUser?.currentUser?.id} />
        <div className="container flex-1">{children}</div>
        {/* footer */}
      </div>
    </>
  );
};
export default MarkettingLayout;
