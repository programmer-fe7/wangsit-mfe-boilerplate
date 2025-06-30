import { defineConfig } from 'vite';
import { resolve } from 'path';

import vue from '@vitejs/plugin-vue';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
  root: '.',
  plugins: [
    vue(),
    istanbul({
      include: 'src/*',
      exclude: [
        'node_modules',
        'test/',
        'src/**/*.spec.ts',
        'src/**/*.cy.spec.ts',
        'src/**/*.type.ts',
        'src/**/*.dto.ts',
      ],
      extension: ['.ts', '.vue'],
      requireEnv: false,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@fewangsit/wangsvue': resolve(
        __dirname,
        'node_modules/@fewangsit/wangsvue',
      ),
    },
  },
  server: {
    port: 9090,
  },
  build: {
    sourcemap: true,
  },
});
