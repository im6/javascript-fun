"use strict";
var fs = require('fs'),
  jade = require('jade'),
  path = require('path'),
  ID = 1;

var configJson = null,
  jsonDir = path.join(__dirname, './viewModel_article.json');
try {
  configJson = JSON.parse(fs.readFileSync(jsonDir));
  configJson['article'] = configJson['article'].filter(v => v.id === ID)[0];
  configJson['module'] = 'article';
  configJson.bundleDir = configJson.bundleDir.replace('<ARTICLEID>', `/${ID}`);
}

catch(err){
  console.error("JSON Error: " + err.message);
}

try {
  var jadePath = path.join(__dirname, `../../../views/article/${configJson.article.id}.jade`);
  var html = jade.renderFile(jadePath, configJson);
  var filePwd = path.join(__dirname, '../../../public/article/1/index.html');
  fs.openSync(filePwd, 'w');
  fs.writeFileSync(filePwd, html);
}
catch(err){
  console.error("Jade Build Error: " + err.message);
}

console.log(`render article ${ID} success!`);