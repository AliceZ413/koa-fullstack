import Router from 'koa-tree-router';
import { z } from 'zod';

import { zValidation } from '../../middleware/z-validation';

const router = new Router().newGroup('/api/auth');

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
      ctx.throw(401, 'User not found');
    }
    ctx.session.user = user;
    ctx.body = {
      code: 0,
      data: user,
    };
  }
);

router.post('/logout', async (ctx) => {
  ctx.session = null;
  ctx.body = {
    message: 'logout!',
  };
});

router.get(
  '/protected',
  async (ctx, next) => {
    console.log(ctx.session.user);

    if (ctx.session.user) {
      await next();
    } else {
      ctx.throw(403, 'UnAuthorization');
    }
  },
  async (ctx) => {
    ctx.body = {
      success: true,
    };
  }
);

export const authRouter = router;
