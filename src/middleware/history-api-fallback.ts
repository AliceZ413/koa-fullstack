/**
 * Koa版的 connect-history-api-fallback(https://github.com/bripkens/connect-history-api-fallback)
 * 用来处理vue-router的history模式跳转问题
 * ! 1. 使用Hash模式不需要此组件
 * ! 2. 前端分离部署时，可以参考网上的文章如何实现history模式部署，比如nginx中只需要设置try_file即可
 */

import { type Middleware } from 'koa';

export function historyApiFallback(): Middleware {
  return async (ctx, next) => {
    if (ctx.method !== 'GET') {
      return next();
    }

    if (!ctx.header || typeof ctx.header.accept !== 'string') {
      return next();
    }

    if (ctx.header.accept.includes('application/json')) {
      return next();
    }

    if (
      !ctx.header.accept.includes('text/html') ||
      !ctx.header.accept.includes('*/*')
    ) {
      return next();
    }

    let isFlag = false;
    ['/api'].forEach((item) => {
      if (!isFlag) {
        isFlag = new RegExp(item).test(ctx.url);
      }
    });
    if (isFlag) {
      return next();
    }

    // 回退访问 '/'
    ctx.url = '/';

    await next();
  };
}
