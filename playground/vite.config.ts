import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Use the source directly so dev iteration is fast and doesn't require pre-build
      'vue-data-map': resolve(__dirname, '../packages/vue-data-map/src/index.ts')
    }
  },
  server: {
    port: 5173,
    host: '127.0.0.1'
  }
});
