import Router from '@koa/router';

const router = new Router({
  prefix: '/api/user',
});

router.post('/login', (ctx) => {
  ctx.session &&
    (ctx.session.user = {
      isLogIn: true,
    });
  ctx.body = {};
});

export default router;
