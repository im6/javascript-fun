const fs = require('fs'),
  pug = require('pug'),
  path = require('path'),
  jsonDir = path.join(__dirname, './viewModel_article.json');

let configJson = null;
const inst = {
  start: (myId) => {
    configJson = JSON.parse(fs.readFileSync(jsonDir));
    configJson.id = myId;
    configJson.article = configJson['article'].filter(v => v.id === configJson.id)[0];
    configJson.page = 6;

    if(process.env.NODE_ENV === 'development'){
      configJson.bundleDir = `/build/${configJson.article.fileName}.js`;
    }else{
      configJson.bundleDir += `${configJson.article.fileName}.js`;
    }

    var pugPath = path.join(__dirname, `../../../views/article/${configJson.id}.pug`);
    var html = pug.renderFile(pugPath, configJson);
    const folderPath = path.join(__dirname, `../../../public/article/${configJson.id}/`);
    if(!fs.existsSync(folderPath)){
      fs.mkdirSync(folderPath);
    }
    var filePwd = path.join(__dirname, `../../../public/article/${configJson.id}/index.html`);
    fs.openSync(filePwd, 'w');
    fs.writeFileSync(filePwd, html);

    console.log(`render article ${configJson.id} success!`);
  }
};
module.exports = inst;