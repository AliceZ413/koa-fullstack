/**
 * Remix middleware v2
 * @description 适用于remix dev -c 命令
 */

import path from 'node:path';
import Koa from 'koa';
import chokidar from 'chokidar';
import { ServerBuild, broadcastDevReady } from '@remix-run/node';
import remixService from '../service/remix.service';

// BUILD_PATH
const BUILD_PATH = path.resolve(process.cwd(), './build/index.js');
const WATCH_PATH = path.resolve(process.cwd(), './build/version.txt');

export let build = require(BUILD_PATH) as ServerBuild;

const createDevRequestHandler: () => Koa.Middleware = () => {
  const handlerServerUpdate = async () => {
    // 1. 重新导入ServerBuild
    build = reimportServer();
    if (build?.assets === undefined) {
      console.log(build.assets);
      debugger;
    }
    // 2. 告诉Remix 服务器已经更新并准备就绪
    await broadcastDevReady(build);
  };
  chokidar
    .watch(WATCH_PATH, { ignoreInitial: true })
    .on('add', handlerServerUpdate)
    .on('change', handlerServerUpdate);

  return async (ctx, next) => {
    try {
      return remixService.createRequestHandler({
        build: build!,
        mode: 'development',
        getLoadContext(ctx) {
          return {
            user: ctx.session?.user,
          };
        },
      })(ctx, next);
    } catch (error) {
      console.log(error);
      next();
    }
  };
};

function reimportServer(): ServerBuild {
  // 1. manually remove the server build from the require cache
  Object.keys(require.cache).forEach((key) => {
    if (key.startsWith(BUILD_PATH)) {
      delete require.cache[key];
    }
  });

  // 2. re-import the server build
  return require(BUILD_PATH) as ServerBuild;
}

export default function RemixMiddleware(): Koa.Middleware {
  return async (ctx, next) => {
    if (remixService.isWhiteListRoute(ctx)) {
      return next();
    }
    return process.env.NODE_ENV === 'development'
      ? createDevRequestHandler()(ctx, next)
      : remixService.createRequestHandler({
          build: build,
          mode: build.mode,
        })(ctx, next);
  };
}
