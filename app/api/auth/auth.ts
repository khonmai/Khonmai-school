import { getServerSession, type NextAuthOptions } from "next-auth";
import Credentials from "@/node_modules/next-auth/providers/credentials";
import { userService } from "./use-service";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const user = await userService.authenticate(username, password);
        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user?.password ?? ""
        );
        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // session.accessToken = token.accessToken!;
      session.user.id = token.sub!;

      return session;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
