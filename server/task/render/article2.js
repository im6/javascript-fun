const fs = require('fs');
const pug = require('pug');
const path = require('path');

module.exports = () => {
  const configJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, './viewModel_article.json'))
  );
  configJson.page = 5;

  if (process.env.NODE_ENV === 'development') {
    configJson.bundleDir = `/build/${configJson.main}.js`;
  } else {
    configJson.bundleDir += `${configJson.main}.js`;
  }

  const pugPath = path.join(__dirname, '../../../views/article/index.pug');
  const html = pug.renderFile(pugPath, configJson);
  const filePwd = path.join(__dirname, '../../../public/article/index.html');
  fs.openSync(filePwd, 'w');
  fs.writeFileSync(filePwd, html);

  console.log('render article list success!');
};
