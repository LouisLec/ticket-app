import { Express, Request, Response, NextFunction } from "express";

export const installHeadersFromCookies = (app: Express) => {
  app.use((req, res, next) => {
    console.log("initial cookies ===>", req.cookies);
    console.log("initial headers ===>", req.headers);
    const jwt = req.cookies?.jwt;
    if (jwt) {
      req.headers["authorization"] = `Bearer ${jwt}`;
    }
    next();
  });
};
