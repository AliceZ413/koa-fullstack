import Koa from 'koa';
import Router from '@koa/router';
import KoaStatic from 'koa-static';
import { broadcastDevReady, installGlobals } from '@remix-run/node';
import { RemixMiddleware, build } from './middleware/remix.middleware';
import { SessionMiddleware } from './middleware/session.middleware';

const port = parseInt(process.env.PORT || '3000', 10);

installGlobals();

const server = new Koa();
server.keys = ['r1x8m0o8px'];
server.use(SessionMiddleware(server));
server.use(KoaStatic('public'));

const router = new Router({
  prefix: '/api',
});
router.post('/user/login', (ctx) => {
  ctx.session &&
    (ctx.session.user = {
      isLogIn: true,
    });
  ctx.body = {};
});
server.use(router.routes()).use(router.allowedMethods());

server.use(RemixMiddleware);

// @ts-ignore
server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
  if (process.env.NODE_ENV === 'development') {
    broadcastDevReady(build);
  }
});
