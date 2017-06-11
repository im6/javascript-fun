"use strict";
let webpackConfig = require('./generic/hot');

const moduleName = 'article';
webpackConfig.entry = `./client/modules/${moduleName}/index.jsx`;
webpackConfig.output.publicPath = `/${moduleName}`;
webpackConfig.devServer.historyApiFallback.index = `${moduleName}/`;

module.exports = webpackConfig;