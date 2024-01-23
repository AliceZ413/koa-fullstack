import Koa from 'koa';
import Router from '@koa/router';
import KoaStatic from 'koa-static';
import { broadcastDevReady, installGlobals } from '@remix-run/node';
// import { RemixMiddleware } from './middleware/remix.middleware';
import { RemixMiddleware, build } from './middleware/remix.middleware-v2';

const port = parseInt(process.env.PORT || '3000', 10);

installGlobals();

const server = new Koa();

server.use(KoaStatic('public'));
server.use(RemixMiddleware);

const router = new Router();
server.use(router.routes()).use(router.allowedMethods());

// @ts-ignore
server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
  if (process.env.NODE_ENV === 'development') {
    broadcastDevReady(build);
  }
});
