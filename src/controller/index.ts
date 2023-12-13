import Router from 'koa-tree-router';
import fsp from 'node:fs/promises';
import path from 'node:path';

const router = new Router();

router.get('/', async (ctx) => {
  const file = await fsp.readFile(path.resolve(process.cwd(), './index.html'));
  let template;
  file && (template = file.toString('utf-8'));

  if (!template) {
    ctx.status = 500;
    ctx.body = 'Server Invalid!';
    return;
  }

  if (process.env.NODE_ENV === 'production') {
    let manifest: Record<string, any> = {};
    const manifestStr = await fsp.readFile(
      path.resolve(process.cwd(), './dist/client/.vite/manifest.json'),
      'utf-8'
    );
    if (manifestStr) {
      manifest = JSON.parse(manifestStr);
    }

    template = template.replace(
      '<!-- prod-script -->',
      `<script type="module" src="/${manifest['views/main.ts'].file}"></script>`
    );
  } else {
    template = template.replace(
      '<!-- dev-script -->',
      `<script type="module" src="http://localhost:5173/@vite/client"></script>
         <script type="module" src="http://localhost:5173/views/main.ts"></script>`
    );
  }

  ctx.type = 'html';
  ctx.body = template;
});

export const indexRouter = router;
