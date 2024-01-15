import { logger } from '@/lib/logger';
import { db } from '@/server/db';
import sha256 from 'crypto-js/sha256';
import { NextApiRequest } from 'next';

const hashPassword = (password: string) => {
  return sha256(password).toString();
};

export const POST = async (request: NextApiRequest) => {
  const user = await db.user.findFirst({
    where: {
      email: request.body.username,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      password: true,
    },
  });
  console.log(request.body.password);
  
  if (user && user.password == hashPassword(request.body.password)) {
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
