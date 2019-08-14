const execSync = require('child_process').execSync;
const inst1 = require('./render/main');
const inst2 = require('./render/site');
const inst3 = require('./render/article2');
const inst4 = require('./render/article1');
const vm = require('./render/viewModel_article.json');
const copy = require('./copy');

console.log('updating the article...');

inst3.start();
vm.article.forEach(v => {
  if (v.fileName) {
    inst4.start(v.id);
  }
});

console.log('updating the views...');

inst1.start(() => {
  copy(() => {
    console.log('pushing to github...');
    execSync('./push.sh');
    console.log('github push complete.');

    console.log('finished Sucess!');
    process.exit();
  });
});
inst2.start();
