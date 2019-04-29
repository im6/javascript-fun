
var fs = require('fs'),
  path = require('path'),
  pug = require('pug');

var configJson = null,
  jsonDir = path.join(__dirname, './viewModel_article.json');

const inst = {
  start: () => {
    try {
      configJson = JSON.parse(fs.readFileSync(jsonDir));
      configJson.page = 5;

      if(process.env.NODE_ENV === 'development'){
        configJson.bundleDir = `/build/${configJson.main}.js`;
      }else{
        configJson.bundleDir += `${configJson.main}.js`;
      }
    }

    catch(err){
      console.error("JSON Error: " + err.message);
    }

    try {
      var pugPath = path.join(__dirname, '../../../views/article/index.pug');
      var html = pug.renderFile(pugPath, configJson);
      var filePwd = path.join(__dirname, '../../../public/article/index.html');
      fs.openSync(filePwd, 'w');
      fs.writeFileSync(filePwd, html);
    }
    catch(err){
      console.error("Pug Build Error: " + err.message);
    }

    console.log("render article list success!");
  }
};

module.exports = inst;