"use strict";
const path = require('path');
let webpackConfig = require('./generic/build');

const moduleName = process.env.MODULENAME;

let entry = `./client/modules/${moduleName}/index.jsx`;
let filename = 'bundle.js';
let outputPath = path.join(__dirname, `../public/${moduleName}`);
let publicPath = `/${moduleName}`;


if(moduleName.substring(0, 7) === 'article'){
  const names = moduleName.split('_');
  if(names[1] === ''){
    entry = `./client/modules/article2/index.jsx`;
    outputPath = path.join(__dirname, `../public/article`);
    publicPath = `/article`;
  } else {
    entry = `./client/modules/article1/index.jsx`;
    outputPath = path.join(__dirname, `../public/article/${names[1]}`);
    publicPath = `/article/${names[1]}}`;
  }
}

webpackConfig.entry = entry;
webpackConfig.output = {
  filename,
  path: outputPath,
  publicPath,
};

module.exports = webpackConfig;