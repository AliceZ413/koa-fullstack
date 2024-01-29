import { ZodSchema } from 'zod';
import Koa from 'koa';

export default function zValidation(schema: ZodSchema): Koa.Middleware {
  return async (ctx, next) => {
    ctx.request.body = schema.parse(ctx.request.body);
    await next();
  };
}
