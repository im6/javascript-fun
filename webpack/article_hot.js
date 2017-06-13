"use strict";
let webpackConfig = require('./generic/hot');

const moduleName = 'article';
webpackConfig.entry = `./client/modules/${moduleName}/index.jsx`;
webpackConfig.output.publicPath = `/${moduleName}/1/`;
webpackConfig.devServer.historyApiFallback.index = `${moduleName}/1/`;

module.exports = webpackConfig;