import { authOptionsWrapper } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession as _getServerSession } from 'next-auth/next';
import { cookies, headers } from 'next/headers';

export default function getServerSession() {
  const { authOptions } = authOptionsWrapper(
    {
      headers: headers(),
      cookies: cookies(),
    } as any,
    {
      params: {
        nextauth: ['session'],
      },
    }
  );

  return _getServerSession(authOptions);

  // return _getServerSession(
  //   authOptionsWrapper(
  //     {
  //       headers: headers(),
  //       cookies: cookies(),
  //     } as any,
  //     { params: { nextauth: ['session'] } }
  //   )[2] as any
  // );
}
