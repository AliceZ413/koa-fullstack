import Koa from 'koa';

type AuthGuard = () => Koa.Middleware;

export const authGuard: AuthGuard = () => {
  return async (ctx, next) => {
    if (ctx.url.includes('/api')) {
      // TODO api路由不做跳转处理由前端来判断
      await next();
    } else {
      if (!ctx.url.includes('/login')) {
        // 非login路由需要校验登录用户
        const user = ctx.session.user;
        if (user) {
          await next();
        } else {
          ctx.redirect('/login');
        }
      }
      await next();
    }
  };
};
