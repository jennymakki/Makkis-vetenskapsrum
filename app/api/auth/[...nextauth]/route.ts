import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

// --- Exporterad authOptions ---
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // --- signIn ---
    async signIn({ user }) {
      if (user.email !== process.env.TEACHER_EMAIL) return false;

      await connectDB();

      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          role: "teacher",
        });
      }

      return true;
    },

    // --- jwt ---
    async jwt({ token, user }) {
      await connectDB();

      if (user?.email) {
        // Första login
        token.email = user.email;
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) token.role = dbUser.role;
      } else if (!token.role && token.email) {
        // Följande requests
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) token.role = dbUser.role;
      }

      return token;
    },

    // --- session ---
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },

    // --- redirect ---
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return baseUrl + "/";
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// --- NextAuth handler export ---
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
