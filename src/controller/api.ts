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

    ctx.body = {};

    ctx.body = {
      user,
    };
  }
);

export const apiRouter = router;
