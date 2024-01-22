import type Koa from 'koa';
import path from 'node:path';
import RemixService from '../service/remix.service';
import { ServerBuild } from '@remix-run/node';

function RemixMiddleware(): Koa.Middleware {
  const remixHandlerPath = path.resolve(process.cwd(), './build');

  // console.log(require(remixHandlerPath));

  return async (ctx: Koa.Context, next: Koa.Next) => {    
    RemixService.purgeRequireCacheInDev(remixHandlerPath);

    return RemixService.createRequestHandler({
      build: require(remixHandlerPath) as ServerBuild,
      mode: process.env.NODE_ENV,
      // getLoadContext: () => ({
      //   user: ctx.session.userContext,
      // }),
    })(ctx, next);
  };
}

export default RemixMiddleware;
