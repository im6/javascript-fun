const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

const {
  clientBaseConfig,
  serverBaseConfig,
  localIdentName,
  include,
} = require('./base');

const prodBase = {
  mode: 'production',
  optimization: {
    minimize: true,
  },
};

const client = Object.assign(clientBaseConfig, prodBase, {
  output: {
    path: path.join(__dirname, '../dist/public'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        include,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName,
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()],
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new OptimizeCssAssetsPlugin(),
  ],
});

const server = Object.assign(serverBaseConfig, prodBase, {
  entry: {
    server: path.join(__dirname, '../src/server'),
    render: path.join(__dirname, '../src/render'),
    collect: path.join(__dirname, '../src/collect'),
  },
  output: {
    path: path.join(__dirname, '../dist/node'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include,
        use: ['babel-loader'],
      },
      {
        test: /\.less$/,
        include,
        use: [
          {
            loader: 'css-loader',
            options: {
              onlyLocals: true,
              modules: {
                localIdentName,
              },
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.lastBuildDate': JSON.stringify(
        `${new Date().toLocaleString()} EST`
      ),
    }),
  ],
});

module.exports = [client, server];
