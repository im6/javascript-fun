"use strict";
var webpack = require('webpack');
var path = require('path');

var webpackConfig = {
  devtool: 'source-map',
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
          'less-loader',
          'autoprefixer-loader'
        ],
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("dev")
      }
    }),
  ],
  //entry: './client/modules/site/index.jsx',
  output: {
    //filename: 'bundle.js',
    //publicPath: '/site',
  },
  devServer: {
    contentBase: "./public",  // set "public" path, relative to root
    noInfo: true,
    hot: true,
    inline: true,
    port: "3000",
    host: "127.0.0.1",
    historyApiFallback: {
      //index: "site/" // set "index" path, relative to contentBase, have to end with /
    }
  }
};

module.exports = webpackConfig;