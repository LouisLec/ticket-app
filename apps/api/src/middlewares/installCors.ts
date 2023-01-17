import { Express } from "express";
import cors from "cors";

export const installCors = (app: Express) => {
  app.use(
    cors({
      origin: [
        "null",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:5867",
        "http://localhost:7802",
        "http://localhost:7803",
        "http://localhost:7804",
        "https://jojo-git-development-jojo.vercel.app",
        /\.jojo\.com$/,
        // regexp for jojo + anything + 'vercel.app'
        /https:\/\/jojo.*\.vercel\.app$/,
      ],
      credentials: true,
    })
  );
};

//<project-name>-<unique-hash>-<scope-slug>.vercel.app
