export const port = process.env.PORT || 3000;
/* istanbul ignore next */
export const staticFolder =
  process.env.NODE_ENV === 'development' ? 'local' : 'dist';
export const renderOutputFolder = 'dist/views';
export const publicPath = '/assets';
export const iconCdnUrl = '//dkny.oss-cn-hangzhou.aliyuncs.com/1/icons';
export const nonLazyImg = 1;
export const favIconSvgUrl = `${iconCdnUrl}/deno.svg`; // [fav.ico, deno-fav.png]
export const favIconPngUrl = `${iconCdnUrl}/deno-fav.png`;
export const author = 'ZJ Guo';
export const pageSpeedUrl =
  'https://developers.google.com/speed/pagespeed/insights/?url=www.javascript.fun&tab=desktop';
export const hideGithubCorner = false;
export const githubUrl = 'https://github.com';
export const gitRepo = `${githubUrl}/im6/javascript-fun`;
export const defaultIcon = [
  'github0.png',
  'github1.svg',
  'github2.svg',
  'github3.png',
  'github4.png',
][2];

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
    img: 'vue.png',
    title: 'Front End',
    alt: 'framework',
    asset: 'main',
  },
  {
    to: '/node/',
    img: 'mongo.png',
    title: 'Node.js',
    alt: 'node',
    asset: 'main',
  },
  {
    to: '/library/',
    img: 'bower.png',
    title: 'Miscellaneous',
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
  git: 'dist/public/main.css',
  site: 'dist/public/site.css',
};

// crawler config
export const crawlerTimeout = 5 * 1000;
export const abusePauseTimeout = 30 * 1000;
export const crawlerStepDelay = 2000;
export const crawlerStepNum = 5;
