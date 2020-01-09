const fs = require('fs');
const pug = require('pug');
const path = require('path');
const configJson = require('../../config.js');

module.exports = article => {
  if (!article.id) {
    return;
  }

  const viewModel = Object.assign(
    {
      page: 6,
      article,
    },
    configJson
  );

  if (process.env.NODE_ENV === 'development') {
    viewModel.bundleDir = `/build/${viewModel.article.fileName}.js`;
  } else {
    viewModel.bundleDir += `${viewModel.article.fileName}.js`;
  }

  const pugPath = path.join(
    __dirname,
    `../../../views/article/${viewModel.article.id}.pug`
  );

  const html = pug.renderFile(pugPath, viewModel);
  const folderPath = path.join(
    __dirname,
    `../../../public/article/${viewModel.article.id}/`
  );
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  const filePwd = path.join(
    __dirname,
    `../../../public/article/${viewModel.article.id}/index.html`
  );
  fs.openSync(filePwd, 'w');
  fs.writeFileSync(filePwd, html);

  console.log(`render article ${viewModel.article.id} success!`);
};
