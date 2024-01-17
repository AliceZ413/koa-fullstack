import { db } from '@/server/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextRequest } from 'next/server';
import CredentialsProvider from 'next-auth/providers/credentials';
import ky from 'ky';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { encode, decode } from 'next-auth/jwt';
import { AuthOptions } from 'next-auth';

interface Context {
  params: { nextauth: string[] };
}

const prismaAdapter = PrismaAdapter(db);

export const authOptionsWrapper = (request: NextRequest, context: Context) => {
  const { params } = context;
  const isCredentialsCallback =
    params?.nextauth?.includes('callback') &&
    params?.nextauth?.includes('credentials') &&
    request.method === 'POST';

  return {
    request,
    context,
    authOptions: {
      adapter: prismaAdapter,
      providers: [
        CredentialsProvider({
          id: 'credentials',
          name: 'credentials',
          credentials: {
            username: {
              label: '账号',
              type: 'text',
              placeholder: '请输入账号',
            },
            password: {
              label: '密码',
              type: 'password',
              placeholder: '请输入密码',
            },
          },
          authorize: async (credentials) => {
            const user = await ky
              .post(
                `${process.env.NEXTAUTH_URL}/api/auth/user/check-credentials`,
                {
                  json: {
                    username: credentials?.username,
                    password: credentials?.password,
                  },
                }
              )
              .json<{ id: string; [key: string]: any }>(); // TODO 将any修改为能够通过ts类型检查的类型
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
      jwt: {
        maxAge: 30 * 24 * 60 * 60,
        async encode(params) {
          if (isCredentialsCallback) {
            const cookie = cookies().get('next-auth.session-token');
            if (cookie) {
              return cookie.value;
            }
            return '';
          }
          return encode(params);
        },
        async decode(params) {
          try {
            console.log(decode(params));
          } catch (err) {
            console.log(err);
          }

          if (isCredentialsCallback) {
            return null;
          }
          return decode(params);
        },
      },
      debug: process.env.NODE_ENV !== 'production',
      callbacks: {
        async signIn({ user }) {
          if (isCredentialsCallback) {
            if (user) {
              const sessionToken = randomUUID();
              const sessionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60);

              await db.session.create({
                data: {
                  sessionToken: sessionToken,
                  userId: user.id,
                  expires: sessionExpiry,
                },
              });

              cookies().set('next-auth.session-token', sessionToken, {
                expires: sessionExpiry,
              });
            }
          }
          return true;
        },
        async redirect({ baseUrl }) {
          return baseUrl;
        },
      },
      events: {
        async signOut({ session }) {
          const { sessionToken = '' } = session as unknown as {
            sessionToken?: string;
          };

          if (sessionToken) {
            await db.session.deleteMany({
              where: {
                sessionToken,
              },
            });
          }
        },
      },
    } as AuthOptions,
  };
};
