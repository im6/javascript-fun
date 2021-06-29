const fs = require('fs');
const { resolve } = require('path');
const { gitJsonPath, siteJsonPath, dataSourceDir } = require('app-constant');
const { getSiteData$, getGithubData$ } = require('./observables');
const { groupSite, groupGithub, convertGroupIcon } = require('./helper');

const fullDataSourceDir = resolve(process.cwd(), '../../', dataSourceDir);

if (!fs.existsSync(fullDataSourceDir)) {
  fs.mkdirSync(fullDataSourceDir);
}

const sqlSite$ = getSiteData$();
const sqlGithub$ = getGithubData$();

sqlGithub$.subscribe({
  next: ([d0, d1]) => {
    const iconMap = convertGroupIcon(d0);
    const data = groupGithub(d1, iconMap);
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

sqlSite$.subscribe({
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
