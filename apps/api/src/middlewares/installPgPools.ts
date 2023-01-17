import { Express } from "express";
import { Pool } from "pg";

export function getRootPgPool(app: Express): Pool {
  return app.get("rootPgPool");
}

export const installDatabasePools = (app: Express) => {
  // This pool runs as the database owner, so it can do anything.
  const rootPgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  app.set("rootPgPool", rootPgPool);
};
