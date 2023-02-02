import { cookies } from "next/headers";
import { sdk } from "./sdk";

export const getCurrentUser = async () => {
  const nextCookies = cookies();
  const jwt = nextCookies.get("jwt");
  return await sdk({
    ...(jwt?.value
      ? { headers: { authorization: `bearer ${jwt.value}` } }
      : {}),
  }).GetCurrentUser();
};
