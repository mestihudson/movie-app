const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const webpack = require('webpack')

const buildDir = 'build'

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, buildDir),
    filename: 'static/js/[name].[contenthash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
  ],
  devServer: {
    static: path.join(__dirname, buildDir),
    compress: true,
    port: process.env.PORT,
    historyApiFallback: true,
    open: true,
    hot: true,
  },
}
