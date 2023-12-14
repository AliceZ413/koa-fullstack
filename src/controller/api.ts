/**
 * test controller
 */
import Router from 'koa-tree-router';

const router = new Router().newGroup('/api');

router.get('/login', async (ctx) => {
  ctx.body = {
    session: ctx.session,
  };
});

router.post('/login', async (ctx) => {
  ctx.session.data = 'TESTING';
  ctx.body = {
    session: ctx.session,
  };
});

export const apiRouter = router;
