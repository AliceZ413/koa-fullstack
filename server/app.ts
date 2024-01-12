import Koa from 'koa';
import Router from '@koa/router';
import next from 'next';
import {parse} from "node:url";

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';

const app = next({
    dev: dev,
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();

    router.get('/(.*)', async (ctx) => {
        const parsedUrl = parse(ctx.originalUrl, true);
        ctx.status = 200;
        await handle(ctx.req, ctx.res, parsedUrl);
        ctx.respond = false;
    });

    server.use(router.routes()).use(router.allowedMethods());

    // @ts-ignore
    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
})
