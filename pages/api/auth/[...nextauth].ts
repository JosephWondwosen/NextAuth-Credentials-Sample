import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/models/User";
import { connectToDB } from "@/helpers/db";
import { verifyPwd } from "@/helpers/auth";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials as User;

        const client = await connectToDB();
        const userCollection = client.db().collection("users");

        const user = await userCollection.findOne({ username });

        if (!user) throw new Error("Invalid Credentials");

        const isValid = await verifyPwd(password, user.password);

        if (!isValid) throw new Error("Invalid Credentials");

        return { id: user._id.toString(), email: username };
      },
    }),
  ],
});
