import { sdk } from "@/utils/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    sdk()
      .Login({ email: req.body.email, password: req.body.password })
      .then(({ login }) => {
        // set login.jwt in cookies if exists
        if (login.jwt) {
          res.setHeader(
            "Set-Cookie",
            `jwt=${login.jwt};  HttpOnly; Secure; max-age=100000; path=/graphql; SameSite=None;`
          );
        }

        res.status(200).json({ login });
      });
  }
}
