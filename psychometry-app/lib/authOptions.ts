import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma'; // Adjust path if needed
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Authorize: Missing credentials');
          return null;
        }

        console.log('Authorize: Finding user for email:', credentials.email);
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log('Authorize: User not found');
          return null;
        }

        console.log('Authorize: Comparing password for user:', user.email);
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword) {
          console.log('Authorize: Invalid password');
          return null;
        }

        console.log('Authorize: Success for user:', user.email);
        // Return user object without password
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          // Add other properties needed for the session/JWT
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    // secret: process.env.NEXTAUTH_SECRET,
    // encryption: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
         (session.user as any).id = token.id;
         // session.user.name = token.name as string;
      }
       console.log("Session Callback - Populated Session:", session);
      return session;
    }
  },
  pages: {
    signIn: '/login',
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user'
  },
  // debug: process.env.NODE_ENV === 'development',
}; 