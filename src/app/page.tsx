'use client';

import { logger } from '@/lib/logger';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import ky from 'ky';

export default function Home() {
  // const searchParams = useSearchParams();
  const handleSignIn = async () => {
    try {
      const body = {
        username: 'admin',
        password: '1234',
      };
      const res = await signIn('credentials', {
        ...body,
        redirect: false,
      });
      logger.debug('signin', res);
    } catch (err) {
      logger.error(err);
    }
  };
  const handleSignUp = async () => {
    ky.post('/api/auth/user/sign-up', {
      json: {
        username: 'admin',
        password: '1234',
      },
    })
      .json()
      .then((json) => {
        logger.debug(json);
      })
      .catch((err) => {
        logger.error(err);
      });
  };

  return (
    <div>
      <button onClick={handleSignUp}>sign up</button>
      <br />
      <button onClick={handleSignIn}>sign in</button>
    </div>
  );
}
