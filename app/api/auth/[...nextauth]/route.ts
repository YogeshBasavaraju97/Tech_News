import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest } from 'next/server';

const handler = NextAuth(authOptions);

export async function GET(req: NextRequest) {
  return handler(req);
}

export async function POST(req: NextRequest) {
  return handler(req);
}
