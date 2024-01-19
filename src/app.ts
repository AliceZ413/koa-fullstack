import Koa from 'koa';
import Router from '@koa/router';
import KoaStatic from 'koa-static';
// import { createRequestHandler } from 'remix-koa-adapter';
// import path from 'node:path';
import RemixMiddleware from './middleware/remix.middleware';

const port = parseInt(process.env.PORT || '3000', 10);
// const BUILD_DIR = path.join(process.cwd(), 'build');

const server = new Koa();

server.use(KoaStatic('public'));
server.use(RemixMiddleware());
// server.use(
//   createRequestHandler({
//     build: require(BUILD_DIR),
//     mode: process.env.NODE_ENV,
//   })
// );

const router = new Router();
// router.get('/(.*)', (ctx) => {

// });
server.use(router.routes()).use(router.allowedMethods());

// @ts-ignore
server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
