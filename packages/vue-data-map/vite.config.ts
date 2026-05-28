import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueDataMap',
      cssFileName: 'vue-data-map',
      fileName: (format) => format === 'es' ? 'vue-data-map.js' : 'vue-data-map.cjs',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue', 'echarts'],
      output: {
        globals: {
          vue: 'Vue',
          echarts: 'echarts'
        },
        exports: 'named'
      }
    },
    sourcemap: true,
    cssCodeSplit: false
  }
});
