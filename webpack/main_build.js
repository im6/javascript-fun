"use strict";
const path = require('path');
let webpackConfig = require('./generic/build');

const moduleName = 'main';

webpackConfig.entry = `./client/modules/${moduleName}/index.jsx`;
webpackConfig.output = {
  filename: 'bundle.js',
  path: path.join(__dirname, `../public/${moduleName}`),
  publicPath: `/${moduleName}`,
};

module.exports = webpackConfig;