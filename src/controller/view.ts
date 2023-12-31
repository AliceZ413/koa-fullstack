/**
 * * 对接Vite的路由
 * * 搭配/src/middleware/history-api-fallback中间件
 */

import fsp from 'node:fs/promises';
import path from 'node:path';
import Router from 'koa-tree-router';

const router = new Router();

/**
 * ! 非必要无需动此处代码
 */
router.get('/', async (ctx) => {
  const host = 'localhost';
  const port = 5173;
  // 读取index.html模板
  const file = await fsp.readFile(path.resolve(process.cwd(), './index.html'));
  let template;

  if (file) {
    template = file.toString('utf-8');
  }
  if (!template) {
    ctx.status = 500;
    ctx.body = 'Server Invalid!';
    return;
  }

  if (process.env.NODE_ENV === 'production') {
    // 在生产环境下，加载打包后的资源文件
    let manifest: Record<string, unknown> = {};
    const manifestStr = await fsp.readFile(path.resolve(process.cwd(), './dist/client/.vite/manifest.json'), 'utf-8');
    if (manifestStr) {
      manifest = JSON.parse(manifestStr);
    }
    template = template.replace(
      '<!-- prod-script -->',
      `<script type="module" src="/${(manifest['ui/main.ts'] as { file: string }).file}"></script>`
    );
  } else {
    // 在开发环境下，加载Vite Dev Server接管的资源
    // 如果使用@vitejs/plugin-react插件，需要将以下代码加在其他的script之上
    template = template.replace(
      '<!-- dev-script -->',
      `<!-- <script type="module">
        import RefreshRuntime from 'http://${host}:${port}/@react-refresh'
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
      </script> -->
      <script type="module" src="http://${host}:${port}/@vite/client"></script>
      <script type="module" src="http://${host}:${port}/ui/main.ts"></script>`
    );
  }

  ctx.type = 'html';
  ctx.body = template;
});

export const viewRouter = router;
