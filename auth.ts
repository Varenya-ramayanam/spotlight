import GitHub from 'next-auth/providers/github';
import NextAuth from 'next-auth';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_GITHUB_ID_QUERY } from '@/sanity/lib/queries';
import { writeClient } from './sanity/lib/write-client';

export const authOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks:{
    async signIn({ user, account, profile }) {
      const { name, email, image } = user;
      const { id, login, bio } = profile || {};
    
      if (!id || !login) return false; // basic guard
    
      const author = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });
    
      if (!author) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }
    
      return true;
    },
    
    async jwt({token,account,profile}){
      if (account && profile) {
        const user = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id:profile?.id });
        token.id = user?._id;

      }
      
      return token;
    },
    async session({session,token}){
      Object.assign(session,{id:token.id});
      return session;
    },

  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
