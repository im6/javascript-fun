const dataSourceDir = 'data-source';
const gitJsonName = 'git.json';
const siteJsonName = 'site.json';

const gitJsonPath = `${dataSourceDir}/${gitJsonName}`;
const siteJsonPath = `${dataSourceDir}/${siteJsonName}`;

module.exports = {
  githubUrl: 'https://github.com',
  gitJsonPath,
  siteJsonPath,
  dataSourceDir,
};
