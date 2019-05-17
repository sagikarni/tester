const path = require('path');
const webpack = require('webpack');

const apiUrl = `http://localhost:${process.env.SERVER_PORT}`;

module.exports = {
  outputDir: '../../dist/tera-admin/public',
  runtimeCompiler: true,
  devServer: {
    clientLogLevel: 'warn',
    proxy: {
      '/graphql': {
        target: apiUrl,
        ws: true,
        changeOrigin: true,
      },
      '/api': {
        target: apiUrl,
        ws: true,
        changeOrigin: true,
      },
      '/auth': {
        target: apiUrl,
        ws: true,
        changeOrigin: true,
      },
      '/storage': {
        target: apiUrl,
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
