import fs from 'node:fs';

const isProduction = process.env.NODE_ENV === 'production';
const vitePort = 5173;
const base = '/';

const templateHtml = isProduction
  ? fs.readFileSync('./dist/client/index.html', 'utf-8')
  : '';

const ssrManifest = isProduction
  ? fs.readFileSync('./dist/client/.vite/manifest.json', 'utf-8')
  : '';
