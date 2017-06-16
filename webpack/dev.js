"use strict";
const webpackConfig = require('./generic/hot');
const moduleName = process.env.MODULENAME;

let entry = `./client/modules/${moduleName}/index.jsx`;
let publicPath = `/${moduleName}`;
let devIndex = `${moduleName}/`;

if(moduleName.substring(0, 7) === 'article'){
  const names = moduleName.split('_');
  if(names[1] === ''){
    entry = `./client/modules/article2/index.jsx`;
    devIndex = `article/`;
  } else {
    entry = `./client/modules/article1/index.jsx`;
    devIndex = `article/${names[1]}/`;
  }
  publicPath = `/article/${names[1]}`;
}

webpackConfig.entry = entry;
webpackConfig.output.publicPath = publicPath;
webpackConfig.devServer.historyApiFallback.index = devIndex;

module.exports = webpackConfig;