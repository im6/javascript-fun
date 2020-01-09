'use strict';
const path = require('path');
const webpackConfig = require('./generic/build');
const configJson = require('../server/config');
const article = configJson.articles[0];

const entries = {
  main: './client/modules/main/index.js',
  site: './client/modules/site/index.js',
};

entries[configJson.main] = './client/modules/article2/index.js';
entries[article.fileName] = './client/modules/article1/index.js';
console.log(entries);
webpackConfig.entry = entries;
webpackConfig.output = {
  filename: '[name].js',
  path: path.join(__dirname, `../public/build`),
  publicPath: '/build',
};

module.exports = webpackConfig;
