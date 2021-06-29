const fs = require('fs');
const { resolve } = require('path');

const { groupSite, groupGithub, convertGroupIcon } = require('./helper');

const { gitJsonPath, siteJsonPath, dataSourceDir } = require('app-constant');
const {
  getSiteDataObservable,
  getGithubDataObservable,
} = require('./observables');

const sqlSite$ = getSiteDataObservable();
const sqlGithub$ = getGithubDataObservable();

sqlGithub$.subscribe({
  next: ([d0, d1]) => {
    const iconMap = convertGroupIcon(d0);
    const data = groupGithub(d1, iconMap);
    fs.writeFile(
      resolve(process.cwd(), '../../', gitJsonPath),
      JSON.stringify(data),
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  },
  error: (err) => {
    console.error(err);
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
          console.error(err);
        }
      }
    );
  },
  error: (err) => {
    console.error(err);
  },
});
