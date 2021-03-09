const path = require('path');
const { include, serverBaseConfig } = require('./base');

module.exports = Object.assign(serverBaseConfig, {
  mode: 'production',
  entry: {
    admin: path.join(__dirname, '../src/admin'),
    collect: path.join(__dirname, '../src/collect'),
  },
  output: {
    path: path.join(__dirname, '../dist/node'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        use: ['babel-loader'],
      },
    ],
  },
});
