const fs = require('fs');
const pug = require('pug');
const path = require('path');

module.exports = articleId => {
  if (!articleId) {
    return;
  }

  const configJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, './viewModel_article.json'))
  );

  configJson.id = articleId;
  configJson.page = 6;
  configJson.article = configJson['article'].filter(
    v => v.id === configJson.id
  )[0];

  if (process.env.NODE_ENV === 'development') {
    configJson.bundleDir = `/build/${configJson.article.fileName}.js`;
  } else {
    configJson.bundleDir += `${configJson.article.fileName}.js`;
  }

  const pugPath = path.join(
    __dirname,
    `../../../views/article/${configJson.id}.pug`
  );
  const html = pug.renderFile(pugPath, configJson);
  const folderPath = path.join(
    __dirname,
    `../../../public/article/${configJson.id}/`
  );
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  const filePwd = path.join(
    __dirname,
    `../../../public/article/${configJson.id}/index.html`
  );
  fs.openSync(filePwd, 'w');
  fs.writeFileSync(filePwd, html);

  console.log(`render article ${configJson.id} success!`);
};
