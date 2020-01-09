const fs = require('fs');
const pug = require('pug');
const path = require('path');
const configJson = require('../../config.js');
module.exports = () => {
  const viewModel = Object.assign(
    {
      page: 5,
    },
    configJson
  );

  if (process.env.NODE_ENV === 'development') {
    viewModel.bundleDir = `/build/${configJson.main}.js`;
  } else {
    viewModel.bundleDir += `${configJson.main}.js`;
  }

  const pugPath = path.join(__dirname, '../../../views/article/index.pug');
  const html = pug.renderFile(pugPath, viewModel);
  const filePwd = path.join(__dirname, '../../../public/article/index.html');
  fs.openSync(filePwd, 'w');
  fs.writeFileSync(filePwd, html);

  console.log('render article list success!');
};
