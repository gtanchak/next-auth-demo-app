import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/libs/prismadb";

import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credential from "next-auth/providers/credentials";

import NextAuth from "next-auth/next";

export default NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    Credential({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "g@gmail.com" },
        password: {
          label: "Password",
          type: "password",
        },
        username: {
          label: "Username",
          type: "text",
          placeholder: "Ghanshyam Tanchak",
        },
      },
      async authorize() {
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
});
