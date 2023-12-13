import Koa from 'koa';
import koaStatic from 'koa-static';
import path from 'node:path';
import mount from 'koa-mount';
import session from 'koa-generic-session';

import { testRouter } from './controller/test';
import { indexRouter } from './controller';
import { historyApiFallback } from './middleware/history-api-fallback';

(async function bootstrap() {
  const app = new Koa();
  const PORT = 3000;

  // session
  // * 使用两个key时，将遍历解析cookie，可以实现更新key但短时间内不会刷掉原有的用户登录
  app.keys = ['keys', 'keykeys'];
  app.use(
    session({
      key: 'koa.sid',
      prefix: 'koa:sess',
    })
  );

  // 类似nginx try_file的一个koa中间件，必须放在router之后
  app.use(historyApiFallback());

  // 注册路由
  app.use(indexRouter.routes());
  app.use(testRouter.routes());

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
    console.log(process.env.NODE_ENV);
    console.log('Server setup in port: ' + PORT);
  });
})();
