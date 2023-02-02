import { getSdk } from "@ticketApp/codegen";
import { GraphQLClient } from "graphql-request";
import { cookies } from "next/headers";
import { fetchWrapper } from "./sdk";

export const signedSdk = (args?: any) => {
  return getSdk(
    new GraphQLClient(
      process.env.NEXT_PUBLIC_API_ENDPOINT
        ? process.env.NEXT_PUBLIC_API_ENDPOINT + "/graphql"
        : "http://localhost:8000/graphql",
      {
        fetch: fetchWrapper({
          ...args,
          ...(cookies()?.get("jwt")?.value
            ? {
                headers: {
                  authorization: `Bearer ${cookies()?.get("jwt")?.value}`,
                },
              }
            : {}),
        }),
      }
    )
  );
};
