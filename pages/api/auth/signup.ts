import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDB } from "@/helpers/db";
import { hashPwd } from "@/helpers/auth";

type Data = {
  message: string;
  data?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username, password } = req.body;

  //TODO: perform validation

  const client = await connectToDB();
  const db = client.db();

  const hashedPassword = await hashPwd(password);

  db.collection("users").insertOne({
    username,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Success" });
}
