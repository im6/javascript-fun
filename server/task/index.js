const { execSync } = require('child_process');

const createGithubPage = require('./render/main');
const createSitePage = require('./render/site');
const createArticleList = require('./render/article2');
const createArticleContent = require('./render/article1');

const vm = require('./render/viewModel_article.json');
const copy = require('./copy');

createArticleList();
vm.article.forEach(v => {
  createArticleContent(v.id);
});
createSitePage();
createGithubPage(() => {
  copy(() => {
    if (process.env.NODE_ENV !== 'development') {
      console.log('pushing to github...');
      execSync('./push.sh');
    }
    console.log('finished Sucess!');
    process.exit();
  });
});
