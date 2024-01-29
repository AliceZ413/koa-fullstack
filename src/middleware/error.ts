import Koa from 'koa';
import { ZodError } from 'zod';

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

export default function ErrorMiddleware(): Koa.Middleware {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      if (error instanceof ZodError) {
        ctx.status = 400;
        ctx.body = defaultTransformer(error);
      }
    }
  };
}
