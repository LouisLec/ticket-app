import Express, { static as staticMiddleware } from "express";
import {
  installPostgraphile,
  installDatabasePools,
  installCors,
  installHeadersFromCookies,
} from "./middlewares";

export const makeApp = () => {
  const app = Express();
  installHeadersFromCookies(app);
  installCors(app);
  installDatabasePools(app);
  installPostgraphile(app);
  return app;
};
