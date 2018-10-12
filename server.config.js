const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
  CheckerPlugin,
  TsConfigPathsPlugin
} = require('awesome-typescript-loader');

const configFileName = path.resolve(__dirname, './apps/server/tsconfig.json');

const copies = [{ from: path.join(__dirname, './apps/server/assets'), to: 'assets' }];

module.exports = (options, webpackOptions) => [
  {
    entry: path.resolve(__dirname, './apps/server/bin/www.ts'),
    output: {
      filename: 'www.js',
      path: path.resolve(__dirname, './dist')
    },
    target: 'node',
    devtool: 'source-map',
    node: {
      __dirname: false
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      plugins: [new TsConfigPathsPlugin({ configFileName })]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          query: { configFileName }
        }
      ]
    },
    plugins: [new CheckerPlugin(), new CopyWebpackPlugin([...copies])]
  }
];
