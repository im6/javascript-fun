import fs from 'fs';
import collectGit from './task/git';
import collectSite from './task/site';
import { viewModelPath } from '../config';

if (!process.env.SQL_HOST) {
  console.error('DB connection info missing.'); // eslint-disable-line no-console
  process.exit();
}

collectSite((err, data) => {
  if (err) {
    console.log('site job failed!'); // eslint-disable-line no-console
  } else {
    fs.writeFileSync(viewModelPath.site, JSON.stringify(data));
    console.log('output site json successfully.'); // eslint-disable-line no-console
  }
});

collectGit((err, data) => {
  if (err) {
    console.log('Github job failed!'); // eslint-disable-line no-console
  } else {
    fs.writeFileSync(viewModelPath.git, JSON.stringify(data));
    console.log('output github json successfully.'); // eslint-disable-line no-console
  }

  process.exit();
});
