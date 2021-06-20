const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

const {
  clientBaseConfig,
  serverBaseConfig,
  localIdentName,
  include,
} = require('./base');

const outputDirectory = '../../../dist';
const prodBase = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};

const client = Object.assign(clientBaseConfig, prodBase, {
  output: {
    path: path.join(__dirname, outputDirectory, 'public'),
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
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer()],
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
    new CssMinimizerPlugin(),
  ],
});

const server = Object.assign(serverBaseConfig, prodBase, {
  entry: {
    server: path.join(__dirname, '../src/server'),
    render: path.join(__dirname, '../src/render'),
  },
  output: {
    path: path.join(__dirname, outputDirectory, 'node'),
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
  // plugins: [new CleanWebpackPlugin()],
});

module.exports = [client, server];
