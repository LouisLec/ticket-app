import { sdk } from "@/utils/sdk";
import { cookies } from "next/headers";
import { SiteHeader } from "./Header";
import { HeroSvg } from "./HeroSvg";

const MarkettingLayout = async ({ children }) => {
  const nextCookies = cookies();
  const jwt = nextCookies.get("jwt");
  const currentUser = await sdk({
    ...(jwt?.value
      ? { headers: { authorization: `bearer ${jwt.value}` } }
      : {}),
  }).GetCurrentUser();

  return (
    <div className="relative">
      <div className="absolute top-16 right-12">
        <HeroSvg />
      </div>
      <div className="relative flex flex-col min-h-screen">
        <SiteHeader isAuth={currentUser?.currentUser?.id} />
        <div className="container flex-1">{children}</div>
        {/* footer */}
      </div>
    </div>
  );
};
export default MarkettingLayout;
