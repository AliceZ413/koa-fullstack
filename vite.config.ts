import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(() => {
  return {
    server: {
      port: 5173,
      host: 'localhost',
    },
    plugins: [vue()],
    build: {
      outDir: 'dist/client',
      manifest: true,
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
