"use strict";
const moduleName = process.env.MODULENAME;
let webpackConfig = require('./generic/hot');
webpackConfig.entry = `./client/modules/${moduleName}/index.jsx`;
webpackConfig.output.publicPath = `/${moduleName}`;
webpackConfig.devServer.historyApiFallback.index = `${moduleName}/`;

module.exports = webpackConfig;