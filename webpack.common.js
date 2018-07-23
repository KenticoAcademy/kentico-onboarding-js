/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */
/* eslint-disable no-path-concat */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    client: './src/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
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
        { loader: 'url-loader', options: { name: 'font-icons/[name].[ext]', limit: 10000 } }
      ] },
      { test: /\.(html|jpg|jpeg|png|ico|gif)/, use: [
        { loader: 'file-loader', options: { name: '[path][name].[ext]', context: 'public' } }
      ] }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          name: 'vendor',
        }
      }
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(['build/*'])
  ],
};
