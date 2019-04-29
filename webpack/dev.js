"use strict";

const webpackConfig = require('./generic/hot');
const configJson = require('../server/task/render/viewModel_article.json');
const article = configJson.article.filter(v => v.id === configJson.id)[0];

const entries = {
  main: ['./client/modules/main/index.js', 'webpack/hot/only-dev-server'],
  site: ['./client/modules/site/index.js', 'webpack/hot/only-dev-server'],
  devServerClient: 'webpack-dev-server/client?http://0.0.0.0:3000'
};

entries[configJson.main] = ['./client/modules/article2/index.js', 'webpack/hot/only-dev-server'];
entries[article.fileName] = ['./client/modules/article1/index.js', 'webpack/hot/only-dev-server'],

webpackConfig.entry = entries;
webpackConfig.output = {
  publicPath: '/build',
  filename: "[name].js",
};
webpackConfig.devServer.historyApiFallback.index = 'main/';


module.exports = webpackConfig;