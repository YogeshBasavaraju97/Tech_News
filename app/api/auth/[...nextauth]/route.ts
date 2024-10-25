import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth'; // Adjust path if needed

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
