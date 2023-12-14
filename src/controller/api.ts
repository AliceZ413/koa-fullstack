/**
 * test controller
 */
import Router from 'koa-tree-router';
import z from 'zod';

import { zValidation } from '../middleware/z-validation';

const router = new Router().newGroup('/api');

router.post(
  '/login',
  zValidation(
    z.object({
      username: z.string(),
      password: z.string(),
    })
  ),
  async (ctx) => {
    const user = {
      username: 'admin',
      password: '12345',
    };

    const { username, password } = ctx.request.body;

    if (username !== user.username || password !== user.password) {
      ctx.throw(401, 'User nou found');
    }
    ctx.session.user = user;
    ctx.body = {
      user,
    };
  }
);

router.post('/logout', async (ctx) => {
  ctx.session = null;
  ctx.body = {
    message: 'logout!',
  };
});

export const apiRouter = router;
