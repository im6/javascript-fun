import fs from 'fs';
import async from 'async';
import collectGit from './task/git';
import collectSite from './task/site';
import { viewModelPath } from '../config';

if (
  !process.env.MY_COOKIE ||
  !process.env.SQL_HOST ||
  !process.env.SQL_USERNAME ||
  !process.env.SQL_PASSWORD
) {
  console.error('DB connection info missing.'); // eslint-disable-line no-console
  process.exit(1);
}

async.parallel(
  [
    (cb) => {
      collectSite((err0, data) => {
        if (err0) {
          // mysql connection error will be caught here
          cb(err0);
        } else {
          fs.writeFile(viewModelPath.site, JSON.stringify(data), (err1) => {
            cb(err1);
          });
        }
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
      console.error('\nJob failed.', err.toString()); // eslint-disable-line no-console
      process.exit(1);
    } else {
      console.log('\nJob success!'); // eslint-disable-line no-console
      process.exit();
    }
  }
);
