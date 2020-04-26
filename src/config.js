export const port = process.env.PORT || 3000;
export const staticFolder =
  process.env.NODE_ENV === 'development' ? 'local' : 'dist';
export const renderOutputFolder = 'dist/views';
export const publicPath = '/assets';
export const iconCdnUrl = '//dkny.oss-cn-hangzhou.aliyuncs.com/1/icons';
export const nonLazyImg = 2;
export const author = 'ZJ Guo';
export const pageSpeedUrl =
  'https://developers.google.com/speed/pagespeed/insights/?url=www.javascript.fun&tab=desktop';
export const hideGithubCorner = false;
export const githubUrl = 'https://github.com';
export const gitRepo = `${githubUrl}/im6/javascript-fun/issues`;
export const defaultIcon = [
  'github0.png',
  'github1.svg',
  'github2.svg',
  'github3.png',
  'github4.png',
][2];
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
  ['#EAFFD0', '#88A6E5'],
  ['#ffb077', '#b0cadb'],
];

export const topNavConfig = [
  {
    to: '/',
    img: 'vue.png',
    title: 'Front End Framework',
    alt: 'framework',
    asset: 'main',
  },
  {
    to: '/node/',
    img: 'mongo.png',
    title: 'Node.js Framework',
    alt: 'node',
    asset: 'main',
  },
  {
    to: '/library/',
    img: 'bower.png',
    title: 'JS Library',
    alt: 'library',
    asset: 'main',
  },
  {
    to: '/site/',
    img: 'site.png',
    title: 'Website',
    alt: 'site',
    asset: 'site',
  },
  {
    to: 'https://github.com/im6/javascript-fun/issues/5',
    img: 'fa-plus-wht.svg',
    title: 'Submit Github Link',
    alt: 'add',
  },
];

export const pageAssetFileName = topNavConfig.reduce((acc, cur) => {
  acc[cur.to] = cur.asset;
  return acc;
}, {});

export const pageLink = topNavConfig.reduce((acc, cur, k) => {
  acc[cur.to] = k + 1;
  return acc;
}, {});

export const viewModelPath = {
  git: 'dist/github.json',
  site: 'dist/site.json',
};

export const criticalCssPath = {
  git: 'dist/public/main.css',
  site: 'dist/public/site.css',
};

// crawler config
export const crawlerTimeout = 5 * 1000;
export const abusePauseTimeout = 30 * 1000;
export const crawlerShowFullNumber = true;
export const crawlerStepDelay = 2000;
export const crawlerStepNum = 5;
