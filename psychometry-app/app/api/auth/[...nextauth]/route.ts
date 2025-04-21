import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authOptions'; // Import from lib
// import CredentialsProvider from 'next-auth/providers/credentials'; // No longer needed here
// import { PrismaAdapter } from '@next-auth/prisma-adapter'; // No longer needed here
// import prisma from '@/lib/prisma'; // No longer needed here
// import bcrypt from 'bcryptjs'; // No longer needed here

// Removed the large authOptions definition block

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 