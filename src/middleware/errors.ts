import Koa from 'koa';
import { ZodError } from 'zod';

export const errorHandler: () => Koa.Middleware = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (err instanceof ZodError) {
        const error = defaultTransformer(err);
        ctx.status = 400;
        ctx.body = error;
      }
    }
  };
};

function defaultTransformer(err: ZodError): object {
  return {
    error: 'Bad Request',
    detail: toDetailObject(err),
  };
}

function toDetailObject(err: ZodError<unknown>) {
  return err.issues.reduce((prev, current) => {
    prev[current.path.join('.')] = `${current.message}`;
    return prev;
  }, {});
}
