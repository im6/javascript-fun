const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ServerStartPlugin = require('./plugins/ServerStartPlugin');

const {
  withoutCssModuleFiles,
  clientBaseConfig,
  serverBaseConfig,
  localIdentName,
} = require('./base');

const client = Object.assign(clientBaseConfig, {
  watch: true,
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
      },
    },
  },
  output: {
    publicPath: '/static/',
    path: path.join(__dirname, '../local/public'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
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
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
});

const server = Object.assign(serverBaseConfig, {
  watch: true,
  mode: 'development',
  output: {
    path: path.join(__dirname, '../local/server'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.less$/,
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
  plugins: [new CleanWebpackPlugin(), new ServerStartPlugin('./local/server')],
  watchOptions: {
    ignored: /node_modules/,
  },
});

module.exports = [client, server];
