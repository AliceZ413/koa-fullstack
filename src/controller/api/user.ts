import Router from '@koa/router';
import { prisma } from '../../lib/db';
import zValidation from '../../middleware/z-validation';
import { LoginParams, loginParamsSchema } from '../../../shared/login';
import SHA256 from 'crypto-js/sha256';

const router = new Router({
  prefix: '/api/user',
});

router.post('/login', zValidation(loginParamsSchema), async (ctx) => {
  const loginParams = ctx.request.body as LoginParams;
  const user = await prisma.user.findFirst({
    where: {
      email: loginParams.username,
      password: SHA256(loginParams.password).toString(),
    },
  });

  if (!user) {
    ctx.body = {
      code: 1,
      msg: '用户名或密码错误',
    };
    return;
  }

  ctx.body = {
    code: 0,
    data: {
      username: user.email,
    },
  };
});

export default router;
