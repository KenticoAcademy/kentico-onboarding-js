/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */
/* eslint-disable no-path-concat */
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'eval-source-map',
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('')
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    port: 3000,
    open: true,
    hot: true,
    proxy: {
      '*': 'http://[::1]:58227/api'
    }
  },
});
