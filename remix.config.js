const { createRoutesFromFolders } = require('@remix-run/v1-route-convention');

/** @type {import('@remix-run/dev'.AppConfig} */
module.exports = {
  serverModuleFormat: 'cjs',
  dev: {
    port: 8002, // 默认的ws不是8002
  },
  routes(defineRoutes) {
    return createRoutesFromFolders(defineRoutes);
  },
};
