import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '@/server/db';
import CredentialsProvider from 'next-auth/providers/credentials';

// @ts-ignore
const handler = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        username: { label: '账号', type: 'text', placeholder: '请输入账号' },
        password: {
          label: '密码',
          type: 'password',
          placeholder: '请输入密码',
        },
      },
      // 调用SignIn()将会到此处，返回null时将进入error页面
      authorize: async (credentials) => {
        const user = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/user/check-credentials`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            accept: 'application/json',
          },
          body: Object.entries(credentials!)
            .map((e) => e.join('='))
            .join('&'),
        })
          .then((res) => res.json())
          .catch((err) => {
            console.log(err);

            return null;
          });
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {},
});

export { handler as GET, handler as POST };
