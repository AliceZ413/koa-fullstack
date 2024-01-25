import KoaSession from 'koa-session';
import Koa from 'koa';
import { storage } from '../service/storage.service';

export const SessionMiddleware: (app: Koa) => Koa.Middleware = (app) => {
  return KoaSession(
    {
      store: {
        async get(key, maxAge, data) {
          return await storage.getItem(key, {
            maxAge,
            data,
          });
        },
        async set(key, sess, maxAge, data) {
          await storage.setItem(key, sess, {
            maxAge,
            data,
          });
        },
        async destroy(key) {
          await storage.removeItem(key);
        },
      },
    },
    app
  );
};
