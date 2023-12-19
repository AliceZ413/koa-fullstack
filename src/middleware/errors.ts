import Koa from 'koa';

export const errorHandler: () => Koa.Middleware = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (err.status === 500) {
        ctx.status = 500;
        ctx.body = {
          message: 'Internal Server Error',
        };
        console.log(err);
      } else {
        ctx.status = 200;
        ctx.body = {
          code: 1,
          statusCode: err.status,
          message: err.message,
        };
      }
    }
  };
};
