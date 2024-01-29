import Koa from 'koa';
import KoaStatic from 'koa-static';
import { broadcastDevReady, installGlobals } from '@remix-run/node';
import RemixMiddleware, { build } from './middleware/remix.middleware';
import SessionMiddleware from './middleware/session.middleware';
import router from './controller/_index';

const port = parseInt(process.env.PORT || '3000', 10);

installGlobals();

const server = new Koa();

server.keys = ['r1x8m0o8px'];

server.use(KoaStatic('public'));

server.use(SessionMiddleware(server));
server.use(RemixMiddleware());

server.use(router.routes()).use(router.allowedMethods());

// @ts-ignore
server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
  if (process.env.NODE_ENV === 'development') {
    broadcastDevReady(build);
  }
});
