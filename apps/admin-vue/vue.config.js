const path = require('path');
const webpack = require('webpack');

const apiUrl = `http://localhost:${process.env.ADMIN_SERVER_PORT}`;

module.exports = {
  outputDir: '../../dist/tera-admin/public',
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
