import { Session, stores } from 'koa-session';
import { destr } from 'destr';

import prisma from './db';

export class PrismaSessionStore implements stores {
  /**
   * 尝试通过sid获取session
   * @param key
   * @param maxAge
   * @param data
   */
  async get(
    sid: string,
    maxAge: number | 'session',
    data: { rolling: boolean }
  ) {
    const p = prisma.session;
    const session = await p.findUnique({
      where: { sid },
    });

    if (session === null) {
      return null;
    }

    try {
      if (
        session.sid &&
        session.expiresAt &&
        new Date().valueOf() >= session.expiresAt.valueOf()
      ) {
        console.log(sid);

        await p.delete({ where: { sid } });
        return null;
      }
      return destr(session.data ?? '{}');
    } catch (err) {
      console.log(err);
    }
  }

  async set(
    sid: string,
    sess: Partial<Session> & { _expire?: number; _maxAge?: number },
    maxAge: number | 'session',
    data: { changed: boolean; rolling: boolean }
  ) {
    let sessionString = JSON.stringify(sess);
    const existingSession = await prisma.session.findUnique({
      where: { sid },
    });
    let ttl = typeof maxAge === 'number' ? Math.floor(maxAge) : 86400000;
    let expiresAt = new Date(new Date().valueOf() + ttl);

    if (existingSession !== null) {
      await prisma.session.update({
        data: {
          expiresAt: expiresAt,
          data: sessionString,
        },
        where: {
          sid,
        },
      });
    } else {
      await prisma.session.create({
        data: {
          sid,
          expiresAt,
          data: sessionString,
        },
      });
    }
  }

  async destroy(sid: string) {
    try {
      if (Array.isArray(sid)) {
        await Promise.all(sid.map(async (id) => this.destroy(id)));
      } else {
        await prisma.session.deleteMany({
          where: { sid },
        });
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
