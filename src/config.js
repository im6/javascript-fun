const { name, author: username, version } = require('../package.json');

const repoUrl = `${username}/${name}`;
const assetDirectory = 'dist/public';

/* istanbul ignore next */
export const staticFolder =
  process.env.NODE_ENV === 'development' ? 'local' : 'dist';
export const renderOutputFolder = 'dist/views';
/* istanbul ignore next */
export const publicPath =
  process.env.NODE_ENV === 'development'
    ? '/assets'
    : `https://cdn.jsdelivr.net/gh/${repoUrl}@v${version}/${assetDirectory}`;
export const iconCdnUrl = '//dkny.oss-cn-hangzhou.aliyuncs.com/1/icons';
export const nonLazyImg = 0;
export const favIconSvgUrl = `${iconCdnUrl}/deno.svg`; // [fav.ico, deno-fav.png]
export const favIconPngUrl = `${iconCdnUrl}/deno-fav.png`;
export const author = 'Zijian Guo';
export const pageSpeedUrl =
  'https://developers.google.com/speed/pagespeed/insights/?url=www.javascript.fun&tab=desktop';
export const hideGithubCorner = false;
export const githubUrl = 'https://github.com';
export const gitRepo = `${githubUrl}/${repoUrl}`;
export const defaultIcon = ['github0.png', 'github1.svg', 'github2.svg'][2];

/* istanbul ignore next */
export const leftNavText = [
  (new Date().getFullYear() + (new Date().getMonth() < 11 ? 0 : 1)).toString(),
  'Developer',
  'Designer',
  'Architect',
  'Beginner',
  'Fun!',
];

export const leftNavTextColors = [
  ['#7bd0ff', '#F38181'],
  ['#e8ec8b', '#57cc9d'],
  ['#EAFFD0', '#a7e5e4'],
  ['#ffb077', '#b0cadb'],
];

export const topNavConfig = [
  {
    to: '/',
    img: 'vue.svg',
    title: 'Front End',
    alt: 'framework',
    asset: 'main',
  },
  {
    to: '/node/',
    img: 'deno.svg',
    title: 'Node.js',
    alt: 'node',
    asset: 'main',
  },
  {
    to: '/library/',
    img: 'vscode.svg',
    title: 'Miscellaneous',
    alt: 'library',
    asset: 'main',
  },
  {
    to: '/site/',
    img: 'javascript.svg',
    title: 'Website',
    alt: 'site',
    asset: 'site',
  },
  {
    to: `${gitRepo}/issues/5`,
    img: 'fa-plus-wht.svg',
    title: 'Submit Github Link',
    alt: 'add',
  },
];

export const topNavDict = topNavConfig.reduce((acc, cur, k) => {
  acc[cur.to] = cur;
  acc[cur.to].link = k + 1;
  return acc;
}, {});

export const viewModelPath = {
  git: 'dist/github.json',
  site: 'dist/site.json',
};

export const criticalCssPath = {
  git: `${assetDirectory}/main.css`,
  site: `${assetDirectory}/site.css`,
};

// crawler config
export const crawlerTimeout = 5 * 1000;
export const abusePauseTimeout = 30 * 1000;
export const crawlerStepDelay = 2000;
export const crawlerStepNum = 5;
