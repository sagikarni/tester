const { resolve } = require('path');
const {  CheckerPlugin,  TsConfigPathsPlugin } = require('awesome-typescript-loader');

function root(path) {
  return resolve(__dirname, '../', path);
}

const nodeExternals = require('webpack-node-externals');

module.exports = function(options, webpackOptions) {
  return [
    {
      entry: root('./server/bin/www.ts'),
      target: 'node',
      output: {
        path: root('dist'),
        filename: 'www.js'
      },
      devtool: 'source-map',
      resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsConfigPathsPlugin()]
      },
      node: {
        __dirname: false,
      },
      externals: [nodeExternals()],
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader'
          }
        ]
      },
      plugins: [new CheckerPlugin()]
    }
  ];
};
