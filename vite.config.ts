import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig(() => {
  return {
    server: {
      port: 5173,
      host: 'localhost',
    },
    plugins: [vueJsx()],
    build: {
      chunkSizeWarningLimit: 2000,
      outDir: 'dist/client',
      manifest: true,
      minify: true,
      rollupOptions: {
        input: 'views/main.ts',
        output: {
          assetFileNames: `assets/[name].[ext]`,
          chunkFileNames: `assets/[name].js`,
          entryFileNames: `assets/[name].js`,
        },
      },
    },
  };
});
