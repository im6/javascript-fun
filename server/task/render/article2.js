
var fs = require('fs'),
  jade = require('jade');

var configJson = null;
try {
  configJson = JSON.parse(fs.readFileSync('./viewModel_article.json'));
  configJson['module'] = 'blog';
  configJson.bundleDir = configJson.bundleDir.replace('<ARTICLEID>', '');
}

catch(err){
  console.error("JSON Error: " + err.message);
}

try {
  var html = jade.renderFile('../../../views/article/index.jade', configJson);
  var filePwd = '../../../public/article/index.html';
  fs.openSync(filePwd, 'w');
  fs.writeFileSync(filePwd, html);
}
catch(err){
  console.error("Jade Build Error: " + err.message);
}

console.log("render success!");