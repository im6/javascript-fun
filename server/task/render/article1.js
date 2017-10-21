"use strict";

var isDev = process.env.NODE_ENV === 'dev',
  fs = require('fs'),
  jade = require('jade'),
  path = require('path'),
  configJson = null,
  jsonDir = path.join(__dirname, './viewModel_article.json');

const inst = {
  start: (myId) => {
    try {
      configJson = JSON.parse(fs.readFileSync(jsonDir));
      configJson.id = myId;
      configJson.article = configJson['article'].filter(v => v.id === configJson.id)[0];
      configJson.page = 6;

      if(isDev){
        configJson.bundleDir = `/build/${configJson.article.fileName}.js`;
      }else{
        configJson.bundleDir += `${configJson.article.fileName}.js`;
      }
    }
    catch(err){
      console.error("JSON Error: " + err.message);
    }

    try {
      var jadePath = path.join(__dirname, `../../../views/article/${configJson.id}.jade`);
      var html = jade.renderFile(jadePath, configJson);
      var filePwd = path.join(__dirname, `../../../public/article/${configJson.id}/index.html`);
      fs.openSync(filePwd, 'w');
      fs.writeFileSync(filePwd, html);
    }
    catch(err){
      console.error("Jade Build Error: " + err.message);
    }

    console.log(`render article ${configJson.id} success!`);
  }
};
module.exports = inst;