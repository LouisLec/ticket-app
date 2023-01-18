import { getSdk } from "@ticketApp/codegen";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:8000/graphql",
  {
    fetch,
  }
);
export const sdk = getSdk(client);
