import { logger } from '@/lib/logger';
import { db } from '@/server/db';
import sha256 from 'crypto-js/sha256';

const hashPassword = (password: string) => {
  return sha256(password).toString();
};

export const POST = async (request: Request) => {
  const json = await request.json();
  const user = await db.user.findFirst({
    where: {
      email: json.username,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      password: true,
    },
  });

  if (user && user.password == hashPassword(json.password)) {
    logger.debug('password correct');
    return Response.json({ ...user });
  } else {
    logger.debug('incorrect credentials');
    return new Response(
      JSON.stringify({
        error: 'Invalid credentials',
      }),
      {
        status: 400,
      }
    );
  }
};
