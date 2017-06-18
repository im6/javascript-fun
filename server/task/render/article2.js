
var fs = require('fs'),
  path = require('path'),
  jade = require('jade');

var configJson = null,
  jsonDir = path.join(__dirname, './viewModel_article.json');
try {
  configJson = JSON.parse(fs.readFileSync(jsonDir));
  configJson['module'] = 'blog';
  configJson.bundleDir = configJson.bundleDir.replace('<ARTICLEID>', '');
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