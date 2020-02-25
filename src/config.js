export const port = process.env.PORT || 3000;
export const staticFolder =
  process.env.NODE_ENV === 'development' ? 'local' : 'dist';
export const renderOutputFolder = 'dist/views';
export const publicPath = '/assets';
export const iconCdnUrl = '//dkny.oss-cn-hangzhou.aliyuncs.com/1/icons';
export const defaultIcon = [
  'github0.png',
  'github1.svg',
  'github2.svg',
  'github3.png',
  'github4.png',
][0];
export const githubUrl = 'https://github.com';
export const leftNavText = [
  new Date().getFullYear(),
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

export const pageAssetFileName = {
  '/': 'main',
  '/node/': 'main',
  '/library/': 'main',
  '/site/': 'site',
};

export const topNavConfig = [
  { to: '/', img: 'vue.png', title: 'Front End Framework', alt: 'framework' },
  { to: '/node/', img: 'mongo.png', title: 'Node.js Framework', alt: 'node' },
  { to: '/library/', img: 'bower.png', title: 'JS Library', alt: 'library' },
  { to: '/site/', img: 'site.png', title: 'Tool', alt: 'site' },
];

export const pageLink = topNavConfig.reduce((acc, cur, k) => {
  acc[cur.to] = k + 1;
  return acc;
}, {});
