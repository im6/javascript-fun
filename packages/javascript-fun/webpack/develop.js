const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ServerStartPlugin = require('./plugins/ServerStartPlugin');
const tailwindcss = require('tailwindcss');

const {
  include,
  clientBaseConfig,
  serverBaseConfig,
  localIdentName,
} = require('./base');

const outputDirectory = '../local';
const devBase = {
  watch: true,
  mode: 'development',
  devtool: 'inline-source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
  stats: {
    errorDetails: true,
  },
};

const client = Object.assign(clientBaseConfig, devBase, {
  output: {
    path: path.join(__dirname, outputDirectory, 'public'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        include,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [tailwindcss],
              },
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
            options: {
              esModule: false,
            },
          },
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
});

const server = Object.assign(serverBaseConfig, devBase, {
  entry: path.join(__dirname, '../src/server'),
  output: {
    path: path.join(__dirname, outputDirectory, 'server'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        include,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName,
                exportOnlyLocals: true,
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
    new ServerStartPlugin(path.join(__dirname, outputDirectory, 'server')),
  ],
});

module.exports = [client, server];
