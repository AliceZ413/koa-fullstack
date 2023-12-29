import Koa from 'koa';
import { ZodError, ZodSchema } from 'zod';

/**
 * 基于zod的koa校验中间件
 * @param schema zod schema
 */
export const zValidation = (schema: ZodSchema) => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.request.body = schema.parse(ctx.request.body);
    await next();
  };
};
