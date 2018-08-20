const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
require('dotenv').config()

module.exports = {
  entry: './client/src/index.js',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'SOCKET_PORT', 'HOST_PORT']),
    new HtmlWebpackPlugin({
      template: './templates/template.html',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: process.env.HOST_PORT,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
}
