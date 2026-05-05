import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectDB } from "./db";
import User from "@/models/User";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()) || [];

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectDB();

        if (!credentials.email.endsWith("@gmail.com")) {
          throw new Error("Only Gmail addresses are allowed.");
        }

        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("No account found with this email.");
        if (!user.password) throw new Error("Please login with Google.");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Incorrect password.");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        if (!user.email.endsWith("@gmail.com")) return false;

        await connectDB();
        let dbUser = await User.findOne({ email: user.email });

        if (!dbUser) {
          const role = ADMIN_EMAILS.includes(user.email) ? "admin" : "student";
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            role,
          });
        }
      }
      return true;
    },

    // lib/auth.js এ jwt callback
    async jwt({ token, user, trigger, session }) {
      // ✅ Session update হলে token update করো
      if (trigger === "update" && session) {
        token.name = session.name
        token.image = session.image
        return token
      }

      if (user) {
        token.role = user.role
        token.id = user.id
      }

      if (token.email) {
        await connectDB()
        const dbUser = await User.findOne({ email: token.email })
        if (dbUser) {
          token.role = ADMIN_EMAILS.includes(dbUser.email) ? "admin" : dbUser.role
          token.id = dbUser._id.toString()
          token.name = dbUser.name
          token.image = dbUser.image
        }
      }

      return token
    },

    async session({ session, token }) {
      session.user.role = token.role
      session.user.id = token.id
      session.user.image = token.image
      session.user.name = token.name  // ✅ name যোগ করো
      return session
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;