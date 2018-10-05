const path = require('path');
const {
  CheckerPlugin,
  TsConfigPathsPlugin
} = require('awesome-typescript-loader');
var nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const configFileName = path.resolve(__dirname, './tsconfig.json');

const copies = [
  { from: path.join(__dirname, './assets'), to: 'assets' }
];

module.exports = (options, webpackOptions) => [
  {
    entry: path.resolve(__dirname, './bin/www.ts'),
    output: {
      filename: 'www.js',
      path: path.resolve(__dirname, '../../dist')
    },
    target: 'node',
    externals: [nodeExternals()],
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