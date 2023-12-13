import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(() => {
  return {
    plugins: [vue()],
    build: {
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
