"use strict";
var webpack = require('webpack');
var path = require('path');
var CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var webpackConfig = {
  mode: 'production',
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            "presets": ["@babel/preset-env"]
          }
        }]
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false,
            },
          },
          'css-loader',
          'less-loader'
        ],
        exclude: /node_modules/
      },
    ]
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    //new CompressionPlugin({
    //  asset: "[path]",
    //  algorithm: "gzip",
    //  test: /\.js$/,
    //}),
  ],
};

module.exports = webpackConfig;