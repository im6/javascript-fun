'use strict';

const globalConfig = require('../config/env'),
  mysql = require('../resource/mysqlConnection'),
  path = require('path'),
  inst1 = require('./render/main'),
  inst2 = require('./render/site'),
  inst3 = require('./render/article2'),
  inst4 = require('./render/article1'),
  vm = require('./render/viewModel_article.json');


console.log("================================");
console.log(`updating the article...`);
console.log("================================");

inst3.start();
vm.article.forEach(v => {
  if(v.fileName){
    inst4.start(v.id);
  }
});

console.log("================================");
console.log(`updating the views...`);
console.log("================================");

inst1.start(() => {
  console.log('Finished Sucess!');
  process.exit();
});
inst2.start();