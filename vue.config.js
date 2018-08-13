const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const apiUrl = 'http://localhost:3000';

module.exports = {
  outputDir: './dist/public',
  chainWebpack: config => {
    config.plugin('html').tap(([options]) => [
      Object.assign(options, {
        template: path.resolve('client/public/index.html')
      })
    ]);
    config.set('entry', './src/main.ts');
    config.set('context', path.join(__dirname + '/client'));
    config.resolve.alias.set('@', path.join(__dirname + '/client/src'));
  },
  configureWebpack: config => {
    return {
      plugins: [
        new CopyWebpackPlugin([
          {
            from: path.join(__dirname + '/client/public/assets'),
            to: 'assets'
          }
        ]),
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
      }
    }
  }
};
