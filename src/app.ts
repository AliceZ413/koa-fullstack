import Koa from 'koa';
import koaStatic from 'koa-static';
import path from 'node:path';
import mount from 'koa-mount';
import session from 'koa-session';
import koaBody from 'koa-body';
import koaCompress from 'koa-compress';

import { testRouter } from './controller/test';
import { viewRouter } from './controller/view';
import { historyApiFallback } from './middleware/history-api-fallback';
import { PrismaSessionStore } from './lib/db/session';
import { authRouter } from './controller/api/auth';
import { authGuard } from './middleware/auth';
import { errorHandler } from './middleware/errors';

bootstrap();

async function bootstrap() {
  const app = new Koa();
  const PORT = 3000;

  app.use(koaCompress({}));

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
  app.use(authGuard());
  // 类似nginx try_file的一个koa中间件，必须放在router之后
  app.use(historyApiFallback());
  app.use(errorHandler());

  // 注册路由
  app.use(viewRouter.routes());
  app.use(testRouter.routes());
  app.use(authRouter.routes());

  // 静态资源托管
  if (process.env.NODE_ENV === 'production') {
    app.use(
      mount(
        '/assets',
        koaStatic(path.resolve(process.cwd(), './dist/client/assets'), {})
      )
    );
  }

  // 开启监听
  app.listen(PORT, () => {
    console.log('Server environment: ' + process.env.NODE_ENV);
    console.log('Server setup in port: ' + PORT);
  });
}
