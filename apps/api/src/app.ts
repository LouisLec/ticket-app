import Express, { static as staticMiddleware } from "express";
import {
  installPostgraphile,
  installDatabasePools,
  installCors,
  installVoyager,
} from "./middlewares";

export const makeApp = () => {
  const app = Express();
  installCors(app);
  installDatabasePools(app);
  installPostgraphile(app);
  installVoyager(app);
  return app;
};
