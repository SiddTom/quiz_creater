// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export const authOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add other providers as needed
  ],
  callbacks: {
    async session({ session, user }) {
      // Save the user ID in the session
      if (user?.id) {
        session.user.id = user.id;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Assuming you get user ID from OAuth provider's profile
      user.id = profile.id;
      return true;
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(authOptions);
