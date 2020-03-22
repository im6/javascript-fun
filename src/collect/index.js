import fs from 'fs';
import async from 'async';
import collectGit from './task/git';
import collectSite from './task/site';
import { viewModelPath } from '../config';

if (!process.env.SQL_HOST) {
  console.error('DB connection info missing.'); // eslint-disable-line no-console
  process.exit();
}

async.parallel(
  [
    (cb) => {
      collectSite((err0, data) => {
        fs.writeFile(viewModelPath.site, JSON.stringify(data), (err1) => {
          cb(err0 || err1);
        });
      });
    },
    (cb) =>
      collectGit((err0, data) => {
        fs.writeFile(viewModelPath.git, JSON.stringify(data), (err1) => {
          cb(err0 || err1);
        });
      }),
  ],
  (err) => {
    if (err) {
      console.error('job failed!', err); // eslint-disable-line no-console
    } else {
      console.log('job success!'); // eslint-disable-line no-console
    }
    process.exit();
  }
);
