/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */
/* eslint-disable no-path-concat */
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: [
        'babel-loader',
        'eslint-loader'
      ] },
      { test: /\.(ts|tsx)$/, exclude: /node_modules/, use: [
        'ts-loader',
        { loader: 'tslint-loader', options: { configFile: 'tslint.json' } }
      ] },
      { test: /\.css$/, use: [
        { loader: 'file-loader', options: { name: 'styles/[name].[ext]' } },
        { loader: 'extract-loader', options: { publicPath: '../' } },
        { loader: 'css-loader' }
      ] },
      { test: /\.(eot|svg|ttf|woff|woff2)/, use: [
        { loader: 'url-loader', options: { name: 'assets/[name].[ext]', limit: 10000 } }
      ] },
      { test: /\.(html|jpg|jpeg|png|ico|gif)/, use: [
        { loader: 'file-loader', options: { name: '[path][name].[ext]', context: 'public' } }
      ] }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(['build'])
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: __dirname + '/build',
    port: 3000,
    open: true
  }
};