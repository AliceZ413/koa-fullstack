import NextAuth from 'next-auth';
import { authOptionsWrapper } from '@/lib/nextAuthOptions';

import { NextRequest } from 'next/server';

interface Context {
  params: { nextauth: string[] };
}

// @ts-ignore
async function handler(request: NextRequest, context: Context) {
  console.log('context', context);
  const { authOptions } = authOptionsWrapper(request, context);

  return NextAuth(request, context, authOptions);
}

export { handler as GET, handler as POST };
