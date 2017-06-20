"use strict";
const path = require('path');
const fs = require('fs');
const webpackConfig = require('./generic/hot');
const moduleName = process.env.MODULENAME;

let entry = `./client/modules/${moduleName}/index.jsx`;
let publicPath = `/build`;
let devIndex = `${moduleName}/`;
let fileName = `${moduleName}.js`;

if(moduleName.substring(0, 7) === 'article'){
  const jsonDir = path.join(__dirname, '../server/task/render/viewModel_article.json');
  const configJson = JSON.parse(fs.readFileSync(jsonDir));
  const article = configJson.article.filter(v => v.id === configJson.id)[0];

  const names = moduleName.split('_');
  if(names[1] === ''){
    entry = `./client/modules/article2/index.jsx`;
    devIndex = `article/`;
  } else {
    entry = `./client/modules/article1/index.jsx`;
    devIndex = `article/${article.id}/`;
  }
}

webpackConfig.entry = entry;
webpackConfig.output.publicPath = publicPath;
webpackConfig.output.filename = fileName;
webpackConfig.devServer.historyApiFallback.index = devIndex;

module.exports = webpackConfig;