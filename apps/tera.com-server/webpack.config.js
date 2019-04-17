const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const NodemonWebpackPlugin = require('nodemon-webpack-plugin');

const configFileName = path.resolve(__dirname, './tsconfig.json');

const copies = [{ from: path.join(__dirname, './src/assets'), to: 'assets' }];

const packageJson = require('./package.json');

const whitelist = Object.keys(packageJson.dependencies).filter(d => packageJson.dependencies[d] === "0.0.0");

module.exports = {
  externals: [nodeExternals({ modulesDir: '../../node_modules' }), nodeExternals({ whitelist })],
  target: 'node',
  devtool: 'source-map',
  entry: {
    www: './src/bin/www.ts'
  },

  output: {
    path: path.join(__dirname, '../../dist/tera.com'),
    filename: '[name].js'
  },

  plugins: [new CopyWebpackPlugin([...copies]), new CheckerPlugin(), new NodemonWebpackPlugin({ nodeArgs: ['--inspect']})],

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
        exclude: /node_modules/,
        options: {
          configFileName,
          useBabel: true,
          babelOptions: {
            babelrc: false,
            presets: [['@babel/preset-env', { targets: { node: true, esmodules: true }, modules: false }]]
          },
          babelCore: '@babel/core'
        }
      }
    ]
  }
};
