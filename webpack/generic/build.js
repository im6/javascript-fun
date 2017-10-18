"use strict";
var webpack = require('webpack');
var path = require('path');
var CompressionPlugin = require("compression-webpack-plugin");

var webpackConfig = {
  //devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
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
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ],
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
    new CompressionPlugin({
      asset: "[path]",
      algorithm: "gzip",
      test: /\.js$/,
    }),
  ],
  //entry: './client/modules/site/index.jsx',
  //output: {
  //  filename: 'bundle.js',
  //  path: path.join(__dirname, '../public/site'),
  //  publicPath: '/site',
  //}
};

module.exports = webpackConfig;