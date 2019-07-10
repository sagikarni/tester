const path = require('path');
const webpack = require('webpack');

const apiUrl = `http://localhost:${process.env.SERVER_PORT}`;

module.exports = {
  runtimeCompiler: true,
  outputDir: '../../dist/tera.com/public',
  devServer: {
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
      '/access': {
        target: apiUrl,
        ws: true,
        changeOrigin: true,
      },
      '/assets': {
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
