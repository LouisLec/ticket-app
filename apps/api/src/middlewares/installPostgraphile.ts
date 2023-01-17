import { Express } from "express";
import postgraphile, { PostGraphileOptions } from "postgraphile";
import { makePgSmartTagsFromFilePlugin } from "postgraphile/plugins";
import PgSimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";
import { NodePlugin } from "graphile-build";
import { GeneratePresignedUrl } from "../plugins";
import { Pool, PoolClient } from "pg";
import { getRootPgPool } from "./installPgPools";
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
import { resolve } from "path";
import { ServerResponse, IncomingMessage } from "http";

const isDev = process.env.NODE_ENV === "development";

export interface OurGraphQLContext {
  pgClient: PoolClient;
  rootPgPool: Pool;
  jwtClaims: any;
  res: ServerResponse;
  req: IncomingMessage;
}
const TagsFilePlugin = makePgSmartTagsFromFilePlugin(
  // We're using JSONC for VSCode compatibility; also using an explicit file
  // path keeps the tests happy.
  resolve(__dirname, "../postgraphile.tags.jsonc")
);

const postgraphileDevelopmentOptions: PostGraphileOptions = {
  watchPg: true,
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  exportGqlSchemaPath: "../../data/schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  allowExplain: true,
  enableCors: false,
};

const postgraphileProductionOptions: PostGraphileOptions = {
  retryOnInitFail: true,
  extendedErrors: ["errcode"],
  graphiql: false,
  disableQueryLog: true,
  enableCors: false,
};

const getPostgraphileOptions = (rootPgPool: Pool): PostGraphileOptions => {
  return {
    subscriptions: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    ignoreIndexes: false,
    appendPlugins: [
      PgSimplifyInflectorPlugin,
      GeneratePresignedUrl,
      TagsFilePlugin,
      ConnectionFilterPlugin,
    ],
    enableQueryBatching: true,
    legacyRelations: "omit",
    pgDefaultRole: process.env.DATABASE_VISITOR,
    // jwtPgTypeIdentifier: "publ.jwt",
    // jwtSecret: process.env.JWT_SECRET,
    additionalGraphQLContextFromRequest: async (
      req,
      res
    ): Promise<Partial<OurGraphQLContext>> => {
      return { rootPgPool, req, res };
    },
    ...(isDev ? postgraphileDevelopmentOptions : postgraphileProductionOptions),
    //  skipPlugins: [NodePlugin],
  };
};

export const installPostgraphile = (app: Express) => {
  const rootPgPool = getRootPgPool(app);
  app.use(
    postgraphile(
      process.env.DATABASE_URL,
      "publ",
      getPostgraphileOptions(rootPgPool)
    )
  );
};
