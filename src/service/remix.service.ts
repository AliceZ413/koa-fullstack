/**
 * Remix Service
 */

import {
  AppLoadContext,
  ServerBuild,
  createReadableStreamFromReadable,
  createRequestHandler as createRemixRequestHandler,
  writeReadableStreamToWritable,
} from '@remix-run/node';
import type Koa from 'koa';

function isWhiteListRoute(ctx: Koa.Context) {
  // 过滤的路径前缀
  return /^\/(build|assets|api)\//gi.test(ctx.url);
}

function purgeRequireCacheInDev(remixHandlerPath: string) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  for (const key in require.cache) {
    if (key.startsWith(remixHandlerPath)) {
      delete require.cache[key];
    }
  }
}

function createRequestHandler({
  build,
  getLoadContext,
  mode,
}: {
  build: ServerBuild | (() => Promise<ServerBuild>);
  getLoadContext?: (
    ctx: Koa.Context
  ) => Promise<AppLoadContext> | AppLoadContext;
  mode?: string;
}): (ctx: Koa.Context, next: Koa.Next) => Promise<void> {
  const handleRequest = createRemixRequestHandler(build, mode);
  return async (ctx, next) => {
    try {
      const request = createRemixRequest(ctx);
      const loadContext = await getLoadContext?.(ctx);

      const response = await handleRequest(request, loadContext);

      await sendRemixResponse(ctx, response);

      return next();
    } catch (err) {
      console.log(err);
      
      next();
    }
  };
}

function createRemixRequest(ctx: Koa.Context) {
  const [, hostnamePort] = ctx.get('X-Forwarded-Host')?.split(':') ?? [];
  const [, hostPort] = ctx.get('host')?.split(':') ?? [];

  const port = hostnamePort || hostPort;
  const resolveHost = `${ctx.hostname}${port ? `:${port}` : ''}`;
  const url = new URL(`${ctx.protocol}://${resolveHost}${ctx.url}`);

  const abortController = new AbortController();
  ctx.req.on('close', () => abortController.abort());

  const init: RequestInit = {
    method: ctx.method,
    headers: createRemixHeaders(ctx.headers),
    signal: abortController.signal,
  };

  if (ctx.method !== 'GET' && ctx.method !== 'HEAD') {
    init.body = createReadableStreamFromReadable(ctx.req);
    (init as { duplex: 'half' }).duplex = 'half';
  }

  return new Request(url.href, init);
}

function createRemixHeaders(requestHeaders: Koa.Context['headers']): Headers {
  const headers = new Headers();
  for (const [key, values] of Object.entries(requestHeaders)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }
  return headers;
}

async function sendRemixResponse(
  ctx: Koa.Context,
  nodeResponse: Response
): Promise<void> {
  ctx.message = nodeResponse.statusText;
  ctx.status = nodeResponse.status;

  for (const [key, value] of nodeResponse.headers.entries()) {
    ctx.append(key, value);
  }

  if (nodeResponse.headers.get('Content-Type')?.match(/text\/event-stream/i)) {
    ctx.flushHeaders();
  }

  if (nodeResponse.body) {
    await writeReadableStreamToWritable(nodeResponse.body, ctx.res);
  } else {
    ctx.res.end();
  }
}

export default {
  isWhiteListRoute,
  purgeRequireCacheInDev,
  createRequestHandler,
};
