import { db } from '@/server/db';
import sha256 from 'crypto-js/sha256'

export const POST = async (request: Request) => {
  const json = await request.json();
  const username = json.username;
  const password = json.password;

  const exist = await db.user.findFirst({
    where: {
      email: username,
    },
  });
  if (exist) {
    return Response.json({
      code: 1,
      message: 'user exist',
    });
  }

  await db.user.create({
    data: {
      email: username,
      password: sha256(password).toString(),
    },
  });

  return Response.json({
    code: 0,
    message: 'success',
  });
};
