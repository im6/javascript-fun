"use strict";
let webpackConfig = require('./generic/hot');

const moduleName = 'site';
webpackConfig.entry = `./client/modules/${moduleName}/index.jsx`;
webpackConfig.output.publicPath = `/${moduleName}`;
webpackConfig.devServer.historyApiFallback.index = `${moduleName}/`;

module.exports = webpackConfig;