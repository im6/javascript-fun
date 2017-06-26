"use strict";
const path = require('path');
const webpackConfig = require('./generic/build');
const configJson = require('../server/task/render/viewModel_article.json');
const article = configJson.article.filter(v => v.id === configJson.id)[0];

const entries = {
  main: './client/modules/main/index.jsx',
  site: './client/modules/site/index.jsx',
};

entries[configJson.main] = './client/modules/article2/index.jsx';
entries[article.fileName] = './client/modules/article1/index.jsx';

webpackConfig.entry = entries;
webpackConfig.output = {
  filename: "[name].js",
  path: path.join(__dirname, `../public/build`),
  publicPath: '/build',

};

module.exports = webpackConfig;