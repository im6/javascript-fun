"use strict";
var webpack = require('webpack');
var path = require('path');
var CompressionPlugin = require("compression-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpackConfig = {
  //devtool: 'cheap-module-source-map',
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
            "presets": ["es2015"]
          }
        }]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            //'style-loader',
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              }
            },
            'less-loader'
          ],
        }),
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mange:{
        "screw-ie8" : true
      },
      compress : {
        "screw_ie8" : true,
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new ExtractTextPlugin({
      filename: "[name].css",
    }),
    //new CompressionPlugin({
    //  asset: "[path]",
    //  algorithm: "gzip",
    //  test: /\.js$/,
    //}),
  ],
  //entry: './client/modules/site/index.jsx',
  //output: {
  //  filename: 'bundle.js',
  //  path: path.join(__dirname, '../public/site'),
  //  publicPath: '/site',
  //}
};

module.exports = webpackConfig;