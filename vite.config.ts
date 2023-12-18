import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    server: {
      port: 5173,
      host: 'localhost',
    },
    plugins: [react()],
    build: {
      outDir: 'dist/client',
      manifest: true,
      rollupOptions: {
        input: 'views/main.tsx',
        output: {
          assetFileNames: `assets/[name].[ext]`,
          chunkFileNames: `assets/[name].js`,
          entryFileNames: `assets/[name].js`,
        },
      },
    },
  };
});
