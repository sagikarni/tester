const path = require('path');
const webpack = require('webpack');

const apiUrl = `http://localhost:${process.env.SERVER_PORT}`;

module.exports = {
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
    },
  },
};
