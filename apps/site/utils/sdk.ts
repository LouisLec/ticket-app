import { getSdk } from "@ticketApp/codegen";
import { GraphQLClient } from "graphql-request";

const fetchWrapper = (url, options = {} as any) => {
  const headers = { "Content-Type": "application/json" };
  const defaultOptions = {
    method: "GET",
    credentials: "include",
    headers: { ...headers, ...options.headers },
    cache: "no-store" || options.cache,
    ...options,
  };
  return fetch(url, defaultOptions);
};

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_API_ENDPOINT + "/graphql" ||
    "http://localhost:8000/graphql",
  {
    fetch: fetchWrapper,
  }
);
export const sdk = getSdk(client);
