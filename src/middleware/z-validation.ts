import Koa from 'koa';
import { ZodError, ZodSchema } from 'zod';

/**
 * 基于zod的koa校验中间件
 * @param schema zod schema
 */
export const zValidation = (schema: ZodSchema) => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    try {
      ctx.request.body = schema.parse(ctx.request.body);
      await next();
    } catch (err) {
      // 如果有抛出Zod Error
      const isZodError = err instanceof ZodError;
      if (!isZodError) {
        throw err;
      }

      ctx.status = 400;
      ctx.body = defaultTransformer(err);
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
  return err.issues.reduce(
    (prev, current) =>
      Object.assign({}, prev, {
        [current.path.join('.')]: `${current.message}`,
      }),
    {}
  );
}
