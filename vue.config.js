const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const apiUrl = 'http://localhost:3000';

const copies = [
  { from: path.join(__dirname + '/apps/web/public/assets'), to: 'assets' }
];

module.exports = {
  outputDir: './dist/public',
  chainWebpack: config => {
    config.plugin('html').tap(([options]) => [
      Object.assign(options, {
        template: path.resolve('apps/web/public/index.html')
      })
    ]);
    config.set('entry', ['./src/main.ts']);
    config.set('context', path.join(__dirname + '/apps/web'));
    config.resolve.alias.set('@', path.join(__dirname + '/apps/web/src'));
    config.resolve.alias.set('@libs', path.join(__dirname + '/libs'));
  },
  configureWebpack: config => {
    return {
      stats: 'verbose',
      devtool: 'source-map',
      plugins: [
        new CopyWebpackPlugin([...copies]),
        new webpack.NormalModuleReplacementPlugin(
          /environments\/environment/gi,
          result =>
            !config.mode || code.mode === 'none'
              ? result
              : (result.request += code.mode)
          //config.mode === 'production' ? (result.request += '.prod') : result
        )
      ]
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
