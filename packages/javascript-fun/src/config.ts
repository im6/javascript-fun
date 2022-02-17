import { githubUrl } from 'app-constant';
import { TopNavConfigSchema } from './typings/interface';

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
export const pageSpeedUrl = `https://pagespeed.web.dev/report?url=https%3A%2F%2Fwww.${domain}%2F`;
export const hideGithubCorner = false;
export const showDisqus = false; // also uncomment import in /src/client/layout/index.js
export const gitRepo = `${githubUrl}/${repoUrl}`;
/* istanbul ignore next */
export const defaultIcon = (function getIconFromDate() {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  if (month === 2 && day > 14 && day < 18) {
    return 'default-irish.svg';
  }
  if (month === 9 && day > 27) {
    return 'default-halloween.svg';
  }
  if (month === 11 && day > 10) {
    return 'default-xmas.svg';
  }
  return 'default-github-0.svg';
})();

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
    page: 100, // doesn't matter
  },
];

export const topNavDict = topNavConfig.reduce(
  (acc: Record<string, TopNavConfigSchema>, cur) => {
    acc[cur.to] = cur;
    return acc;
  },
  {}
);