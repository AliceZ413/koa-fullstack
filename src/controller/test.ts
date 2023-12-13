/**
 * test controller
 */
import Router from 'koa-tree-router';

const router = new Router().newGroup('/test');

// 作用于当前路由的中间件
router.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.get('/', async (ctx) => {
  ctx.body = 'GET /test';
});

export const testRouter = router;
