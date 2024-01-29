import apiUserRouter from './api/user';
import Router from '@koa/router';

const router = new Router();

router.use(apiUserRouter.routes(), apiUserRouter.allowedMethods());

export default router;
