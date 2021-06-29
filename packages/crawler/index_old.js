const fs = require('fs');
const { resolve } = require('path');
const async = require('async');
const { gitJsonPath, siteJsonPath, dataSourceDir } = require('app-constant');

const collectGit = require('./task/git');
const collectSite = require('./task/site');

const fullDataSourceDir = resolve(process.cwd(), '../../', dataSourceDir);

if (!fs.existsSync(fullDataSourceDir)) {
  fs.mkdirSync(fullDataSourceDir);
}

async.parallel(
  [
    (cb) => {
      collectSite((err0, data) => {
        if (err0) {
          // mysql connection error will be caught here
          cb(err0);
        } else {
          fs.writeFile(
            resolve(process.cwd(), '../../', siteJsonPath),
            JSON.stringify(data),
            (err1) => {
              cb(err1);
            }
          );
        }
      });
    },
    (cb) =>
      collectGit((err0, data) => {
        fs.writeFile(
          resolve(process.cwd(), '../../', gitJsonPath),
          JSON.stringify(data),
          (err1) => {
            cb(err0 || err1);
          }
        );
      }),
  ],
  (err) => {
    if (err) {
      console.error('\nJob failed.', err); // eslint-disable-line no-console
      process.exit(1);
    } else {
      console.log('\nJob success!'); // eslint-disable-line no-console
      process.exit();
    }
  }
);
