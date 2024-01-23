import type Koa from 'koa';
import path from 'node:path';
import RemixService from '../service/remix.service';
import { ServerBuild } from '@remix-run/node';

// BUILD_PATH
const BUILD_PATH = path.resolve(process.cwd(), './build/index.js');

export const RemixMiddleware: () => Koa.Middleware = () => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    RemixService.purgeRequireCacheInDev(BUILD_PATH);
    return RemixService.createRequestHandler({
      build: require(BUILD_PATH) as ServerBuild,
      mode: process.env.NODE_ENV,
      // getLoadContext: () => ({
      //   user: ctx.session.userContext,
      // }),
    })(ctx, next);
  };
};
