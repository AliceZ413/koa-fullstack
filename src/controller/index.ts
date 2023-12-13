import Router from 'koa-tree-router';
import fsp from 'node:fs/promises';
import path from 'node:path';

const router = new Router();
const html = String.raw;
const prodHtml = html`
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <title>Vite App</title>
    </head>
    <body>
      <div id="app"></div>
      <script
        type="module"
        src="/assets/main.js"
      ></script>
    </body>
  </html>
`;
const devHtml = html`
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <title>Vite App</title>
    </head>
    <body>
      <div id="app"></div>

      <script
        type="module"
        src="http://localhost:5173/@vite/client"
      ></script>
      <script
        type="module"
        src="http://localhost:5173/views/main.ts"
      ></script>
    </body>
  </html>
`;

router.get('/', async (ctx) => {
  const file = await fsp.readFile(path.resolve(__dirname, '../../index.html'));
  let template;
  file && (template = file.toString('utf-8'));

  if (!template) {
    ctx.status = 500;
    ctx.body = 'Server Invalid!';
    return;
  }

  if (process.env.NODE_ENV === 'production') {
    template = template.replace(
      '<!-- prod-script -->',
      `<script type="module" src="/assets/main.js"></script>`
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
