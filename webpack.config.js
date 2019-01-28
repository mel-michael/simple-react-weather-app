const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      {test: /\.js$/, use: 'babel-loader'},
      {test: /\.(css)$/, use: ['style-loader', 'css-loader'] },
      { test: /\.svg$/, loader: 'svg-inline-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './index.html'})
  ],
  mode: 'development',
}