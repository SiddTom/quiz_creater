// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Define the NextAuth options
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ,
    }),
    // Add other providers here if needed
  ],
  callbacks: {
    async session({ session, token }) {
      // Save the user ID in the session
      if (token?.sub) {
        session.user.id = token.sub;
      }
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
    async signIn({ user, account, profile }) {
      // Customize the sign-in logic here if needed
      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // When the user signs in, persist user info in the JWT
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
};

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };
