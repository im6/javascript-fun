import { githubUrl } from 'app-constant';

const cdnTag = 'v1.5.4';
const repoUrl = 'im6/javascript-fun';
const assetDirectory = 'dist/public';

export const criticalAssetPath = {
  gitJs: `${assetDirectory}/main.js`,
  gitCss: `${assetDirectory}/main.css`,
  siteJs: `${assetDirectory}/site.js`,
  siteCss: `${assetDirectory}/site.css`,
};

export const domain = 'javascript.fun';

/* istanbul ignore next */
export const staticFolder =
  process.env.NODE_ENV === 'development' ? 'local' : 'dist';
export const renderOutputFolder = 'dist/views';
/* istanbul ignore next */
export const publicPath =
  process.env.NODE_ENV === 'development'
    ? '/assets'
    : `https://cdn.jsdelivr.net/gh/${repoUrl}@${cdnTag}/${assetDirectory}`;
export const iconCdnUrl = '//dkny.oss-cn-hangzhou.aliyuncs.com/1/icons';
export const nonLazyImg = 0;
export const favIconSvgUrl = `${iconCdnUrl}/deno.svg`; // [fav.ico, deno-fav.png]
export const favIconPngUrl = `${iconCdnUrl}/deno-fav.png`;
export const author = 'Zijian Guo';
export const pageSpeedUrl = `https://developers.google.com/speed/pagespeed/insights/?url=www.${domain}&tab=desktop`;
export const hideGithubCorner = false;
export const showDisqus = true;
export const gitRepo = `${githubUrl}/${repoUrl}`;
export const defaultIcon = ['github0.png', 'github1.svg', 'github2.svg'][2];

/* istanbul ignore next */
export const primaryYear = (
  new Date().getFullYear() + (new Date().getMonth() < 11 ? 0 : 1)
).toString();
export const leftNavText = [
  primaryYear,
  'Developer',
  'Designer',
  'Architect',
  'Beginner',
  'Fun!',
];

export const topNavConfig = [
  {
    to: '/',
    img: 'vue.svg',
    title: 'Front End',
    alt: 'framework',
    disqusId: 'jsfun-000',
    asset: 'main',
    page: 1,
  },
  {
    to: '/node/',
    img: 'deno.svg',
    title: 'Node.js',
    alt: 'node',
    disqusId: 'jsfun-001',
    asset: 'main',
    page: 2,
  },
  {
    to: '/library/',
    img: 'vscode.svg',
    title: 'Miscellaneous',
    alt: 'library',
    disqusId: 'jsfun-002',
    asset: 'main',
    page: 3,
  },
  {
    to: '/site/',
    img: 'javascript.svg',
    title: 'Website',
    alt: 'site',
    disqusId: 'jsfun-003',
    asset: 'site',
  },
  {
    to: `${gitRepo}/discussions/7`,
    img: 'fa-plus-wht.svg',
    title: 'Submit Github Link',
    alt: 'add',
  },
];

export const topNavDict = topNavConfig.reduce((acc, cur) => {
  acc[cur.to] = cur;
  return acc;
}, {});
