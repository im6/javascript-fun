
var isDev = process.env.NODE_ENV === 'dev',
  fs = require('fs'),
  path = require('path'),
  jade = require('jade');

var configJson = null,
  jsonDir = path.join(__dirname, './viewModel_article.json');


const inst = {
  start: () => {
    try {
      configJson = JSON.parse(fs.readFileSync(jsonDir));
      configJson.page = 5;

      if(isDev){
        configJson.bundleDir = `/build/${configJson.main}.js`;
      }else{
        configJson.bundleDir += `${configJson.main}.js`;
      }
    }

    catch(err){
      console.error("JSON Error: " + err.message);
    }

    try {
      var jadePath = path.join(__dirname, '../../../views/article/index.jade');
      var html = jade.renderFile(jadePath, configJson);
      var filePwd = path.join(__dirname, '../../../public/article/index.html');
      fs.openSync(filePwd, 'w');
      fs.writeFileSync(filePwd, html);
    }
    catch(err){
      console.error("Jade Build Error: " + err.message);
    }

    console.log("render article list success!");
  }
};

module.exports = inst;