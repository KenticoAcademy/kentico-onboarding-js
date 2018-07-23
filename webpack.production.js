/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */
/* eslint-disable no-path-concat */
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'cheap-source-map',
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ]
});
