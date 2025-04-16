import GitHub from 'next-auth/providers/github';
import NextAuth from 'next-auth';

export const authOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
