const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const apiUrl = 'http://localhost:3000';

const copies = [
  { from: path.join(__dirname + '/apps/web/public'),  ignore: ['index.html', '.DS_Store'] }
];

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: './dist/public',
  chainWebpack: config => {
    config.plugin('html').tap(([options]) => [
      Object.assign(options, {
        template: resolve('apps/web/public/index.html')
      })
    ]);
    config.set('entry', ['./src/main.ts']);
    config.set('context', resolve('/apps/web'));
    config.resolve.alias.set('@', resolve('apps/web/src'));
    config.resolve.alias.set('@libs', resolve('libs'));
   
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
    // publicPath: './apps/web/public',

    // publicPath: 'C:\\code\\tera\\apps\\web\\public',
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
