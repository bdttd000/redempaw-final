import prisma from "@/prisma/prismaClient";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { hash } from "@/app/utils/helpers";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        let user = null;
        try {
          user = await prisma.users.findUnique({
            where: {
              email: credentials.email,
            },
          });
        } catch (e) {
          return null;
        }

        if (!user || !(hash(credentials.password) === user.password)) {
          return null;
        }

        return {
          id: user.user_id,
          email: user.email,
          randomKey: "randomKey",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};
