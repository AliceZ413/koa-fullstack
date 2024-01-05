import path from 'node:path';
import Koa from 'koa';
import koaBody from 'koa-body';
import koaCompress from 'koa-compress';
import mount from 'koa-mount';
import session from 'koa-session';
import koaStatic from 'koa-static';

import { authRouter } from './controller/api/auth';
import { PrismaSessionStore } from './lib/db/session';
import { authGuard } from './middleware/auth';
import { errorHandler } from './middleware/errors';
import { historyApiFallback } from './middleware/history-api-fallback';
import koaConnect from 'koa-connect';
import { renderPage } from 'vike/server';

const PORT = 3000;

async function bootstrap() {
  const app = new Koa();

  // session
  // * 使用两个key时，将遍历解析cookie，可以实现更新key但短时间内不会刷掉原有的用户登录
  app.keys = ['keys', 'keykeys'];
  app.use(
    session(
      {
        key: 'koa.sid',
        // maxAge: 5 * 1000,
        store: new PrismaSessionStore(),
      },
      app
    )
  );

  app.use(koaBody());

  // 路由守卫
  // app.use(authGuard());
  // 类似nginx try_file的一个koa中间件
  app.use(historyApiFallback());
  app.use(errorHandler());

  // 注册路由
  app.use(authRouter.routes());

  // 静态资源托管
  if (process.env.NODE_ENV === 'production') {
    app.use(koaCompress());
    app.use(
      mount(
        '/assets',
        koaStatic(path.resolve(process.cwd(), './dist/client/assets'), {})
      )
    );
  } else {
    const vite = await import('vite');
    const viteDevServer = await vite.createServer({
      root: path.resolve(process.cwd()),
      server: { middlewareMode: true },
    });
    app.use(koaConnect(viteDevServer.middlewares));
  }

  app.use(async (ctx, next) => {
    const pageContextInit = {
      urlOriginal: ctx.originalUrl,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) {
      return next();
    }
    const { body, statusCode, headers, earlyHints } = httpResponse;
    if (ctx.res.writeEarlyHints) {
      ctx.res.writeEarlyHints({
        link: earlyHints.map((e) => e.earlyHintLink),
      });
    }
    ctx.status = statusCode;
    headers.map(([name, value]) => ctx.set(name, value));
    ctx.body = body;
  });

  return { app };
}

bootstrap()
  .then(({ app }) => {
    // 开启监听
    app.listen(PORT, () => {
      console.log(`Server environment: ${process.env.NODE_ENV}`);
      console.log(`Server setup in port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(0);
  });
