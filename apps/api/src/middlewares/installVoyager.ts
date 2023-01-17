import { express as voyagerMiddleware } from "graphql-voyager/middleware";

import { Express } from "express";

export const installVoyager = (app: Express) => {
  app.use("/voyager", voyagerMiddleware({ endpointUrl: "/graphql" }));
};
