"use strict";
let webpackConfig = require('./generic/hot');

const moduleName = 'article';
webpackConfig.entry = `./client/modules/${moduleName}2/index.jsx`;
webpackConfig.output.publicPath = `/${moduleName}/list`;
webpackConfig.devServer.historyApiFallback.index = `${moduleName}/list/`;

module.exports = webpackConfig;