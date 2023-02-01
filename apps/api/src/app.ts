import Express, { static as staticMiddleware } from "express";
import {
  installPostgraphile,
  installDatabasePools,
  installCors,
} from "./middlewares";

export const makeApp = () => {
  const app = Express();
  installCors(app);
  installDatabasePools(app);
  installPostgraphile(app);
  return app;
};
