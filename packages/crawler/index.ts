require('dotenv').config({ path: '../../../javascript-fun.env' });

const fs = require('fs');

import { resolve } from 'path';
import { gitJsonPath, siteJsonPath, dataSourceDir } from 'app-constant';
import { getSiteData$, getGithubData$ } from './observables';
import { groupSite, groupGithub, generateCateMap } from './helper';

const fullDataSourceDir = resolve(process.cwd(), '../../', dataSourceDir);

if (!fs.existsSync(fullDataSourceDir)) {
  fs.mkdirSync(fullDataSourceDir);
}

const siteData$ = getSiteData$();
const githubData$ = getGithubData$();

githubData$.subscribe({
  next: ([d0, d1]) => {
    const cateMap = generateCateMap(d0);
    const data = groupGithub(d1, cateMap);
    fs.writeFile(
      resolve(process.cwd(), '../../', gitJsonPath),
      JSON.stringify(data),
      (err) => {
        if (err) {
          console.error(err); // eslint-disable-line no-console
        }
      }
    );
    console.log('\n Github Job success!'); // eslint-disable-line no-console
  },
  error: (err) => {
    console.error('\n Github Job failed.', err); // eslint-disable-line no-console
  },
});

siteData$.subscribe({
  next: ([grps, sites]) => {
    const siteList = groupSite(sites, grps);
    fs.writeFile(
      resolve(process.cwd(), '../../', siteJsonPath),
      JSON.stringify(siteList),
      (err) => {
        if (err) {
          console.error(err); // eslint-disable-line no-console
        }
      }
    );
    console.log('\n Site Job success!'); // eslint-disable-line no-console
  },
  error: (err) => {
    console.error('\n Site Job failed.', err); // eslint-disable-line no-console
  },
});
