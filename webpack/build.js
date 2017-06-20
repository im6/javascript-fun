"use strict";
const path = require('path');
let webpackConfig = require('./generic/build');

const moduleName = process.env.MODULENAME;

let entry = `./client/modules/${moduleName}/index.jsx`;
const filename = `${moduleName}.js`;
const outputPath = path.join(__dirname, `../public/build`);
const publicPath = `/build`;

if(moduleName.substring(0, 7) === 'article'){
  const names = moduleName.split('_');
  if(names[1] === ''){
    entry = `./client/modules/article2/index.jsx`;
  } else {
    entry = `./client/modules/article1/index.jsx`;
  }
}

webpackConfig.entry = entry;
webpackConfig.output = {
  filename,
  path: outputPath,
  publicPath,
};

module.exports = webpackConfig;