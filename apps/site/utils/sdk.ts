import { getSdk } from "@ticketApp/codegen";
import { GraphQLClient } from "graphql-request";

const fetchWrapper = args => {
  return (url, options: any) => {
    const headers = {
      ...{ "Content-Type": "application/json" },
      ...options.headers,
      ...args?.headers,
    };
    const defaultOptions = {
      method: "GET",
      credentials: "include",
      ...options,
      headers,
      cache: "no-store" || options.cache,
    };
    console.log("fetchWrapper", { url, options, defaultOptions });
    return fetch(url, defaultOptions);
  };
};

export const sdk = (args?: any) =>
  getSdk(
    new GraphQLClient(
      process.env.NEXT_PUBLIC_API_ENDPOINT
        ? process.env.NEXT_PUBLIC_API_ENDPOINT + "/graphql"
        : "http://localhost:8000/graphql",
      {
        fetch: fetchWrapper(args),
      }
    )
  );
