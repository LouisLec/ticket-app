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
        "https://ticket-app-git-development-ticket-app.vercel.app",
        /\.ticket-app\.com$/,
        // regexp for ticket-app + anything + 'vercel.app'
        /https:\/\/ticket-app.*\.vercel\.app$/,
      ],
      credentials: true,
    })
  );
};

//<project-name>-<unique-hash>-<scope-slug>.vercel.app
