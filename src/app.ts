import Koa from 'koa';
import Router from '@koa/router';

const port = parseInt(process.env.PORT || '3000', 10);

const server = new Koa();
const router = new Router();

server.use(router.routes()).use(router.allowedMethods());

// @ts-ignore
server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
