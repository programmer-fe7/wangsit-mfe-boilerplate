/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require('@vue/cli-service');
const { resolve } = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryTarget: 'system',
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    devServer: {
      port: 8080,
      liveReload: false,
      hot: false,
    },
    externals: [
      'vue',
      'vue-router',
      'axios',
      'single-spa-vue',
      'single-spa',
      '@fewangsit/wangsvue',
      '@fewangsit/wangsvue-presets/wangsvue',
      '@fewangsit/workspace-api-services',
    ],
  },
});
