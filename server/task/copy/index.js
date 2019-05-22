const path = require('path');
const fs = require('fs');

const src = path.join(__dirname, '../../../public/');
const dest = path.join(__dirname, '../../../../im6.github.io');
const jsDest = path.join(__dirname, '../../../../im6.github.io/cdn/0/');

const files = [
  'index.html',
  'node/index.html',
  'library/index.html',
  'site/index.html',
  'article/index.html',
  'article/1/index.html',
  'article/2/index.html',
  'article/3/index.html',
  'article/4/index.html',
];

const jsFiles = [
  'build/article0.js',
  'build/article1.js',
  'build/main.js',
  'build/site.js',
]

const copy = (cb) => {
  console.log('start copy...');
  files.forEach(v => {
    console.log(`copying ${path.join(src, v)}`);
    fs.copyFileSync(path.join(src, v), path.join(dest, v));
  });

  jsFiles.forEach(v => {
    console.log(`copying ${path.join(src, v)}`);
    fs.copyFileSync(path.join(src, v), path.join(jsDest, v.replace(/(.)+\//, '')));
  });
  console.log('copy complete.');
  cb();
}

module.exports = copy;