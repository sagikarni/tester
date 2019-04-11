const path = require('path');
const webpack = require('webpack');

const apiUrl = `http://localhost:${process.env.SERVER_PORT}`;

module.exports = {
  runtimeCompiler: true,
  outputDir: '../../dist/tera.com/public',
  devServer: {
    proxy: {
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
      '/assets': {
        target: apiUrl,
        ws: true,
        changeOrigin: true,
      },
      '/graphql': {
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
