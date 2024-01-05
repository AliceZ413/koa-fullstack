import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vike from 'vike/plugin'

export default defineConfig(() => {
  return {
    server: {
      port: 5173,
      host: 'localhost',
    },
    plugins: [vue(), vueJsx(), vike()],
    // build: {
    //   chunkSizeWarningLimit: 2000,
    //   outDir: 'dist/client',
    //   manifest: true,
    //   minify: true,
    //   rollupOptions: {
    //     input: 'ui/main.ts',
    //     output: {
    //       assetFileNames: 'assets/[name].[ext]',
    //       chunkFileNames: 'assets/[name].js',
    //       entryFileNames: 'assets/[name].js',
    //     },
    //   },
    // },
  };
});
