const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const apiUrl = 'http://localhost:3000';
const copies = [{ from: path.join(__dirname + '/apps/web/public'), ignore: ['index.html', '.DS_Store'] }];

module.exports = {
  runtimeCompiler: true,
  outputDir: './dist/public',
  chainWebpack: config => {
    const resolve = dir => path.join(__dirname, dir);
    const template = resolve('apps/web/public/index.html');

    config.plugin('html').tap(([options]) => [{ ...options, template }]);
    config.set('entry', ['./src/main.ts']).set('context', resolve('/apps/web'));
    config.resolve.alias.set('@', resolve('apps/web/src')).set('@libs', resolve('libs'));
  },
  configureWebpack: config => {
    return {
      mode: 'development',
      stats: 'verbose',
      devtool: 'source-map',
      plugins: [new CopyWebpackPlugin([...copies])]
      // optimization: {
      //   splitChunks: {
      //     chunks: 'all'
      //   }
      // }
    };
  },

  devServer: {
    proxy: {
      '/api': {
        target: apiUrl,
        ws: true,
        changeOrigin: true
      },
      '/auth': {
        target: apiUrl,
        ws: true,
        changeOrigin: true
      }
    }
  }
};
