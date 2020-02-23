require('dotenv').config();
const path = require('path');

const createGithubPage = require('./render/main');
const createSitePage = require('./render/site');

const gitOutputPath = path.join(process.cwd(), 'dist/github.json');
const siteOutputPath = path.join(process.cwd(), 'dist/site.json');

createSitePage(siteOutputPath);
createGithubPage(gitOutputPath, () => {
  console.log('finished Sucess!');
  process.exit();
});
