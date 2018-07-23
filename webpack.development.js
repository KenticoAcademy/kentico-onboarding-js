/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */
/* eslint-disable no-path-concat */
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    port: 3000,
    open: true
  }
});
