import { sdk } from "@/utils/sdk/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    sdk()
      .Login({ email: req.body.email, password: req.body.password })
      .then(({ login }) => {
        // set login.jwt in cookies if exists
        console.log(login);
        if (login.jwt) {
          res.setHeader(
            "Set-Cookie",
            `jwt=${
              login.jwt as string
            };  HttpOnly; Secure; max-age=100000; path=/; SameSite=None;`
          );
        }

        res.status(200).json({ login });
      })
      .catch(err => {
        res.status(500).json({ err });
      });
  }
}
