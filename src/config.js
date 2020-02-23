export const port = process.env.PORT || 3000;
export const staticFolder =
  process.env.NODE_ENV == 'development' ? 'local' : 'dist';
export const iconCdnUrl = '//dkny.oss-cn-hangzhou.aliyuncs.com/1/icons';
export const defaultIcon = 'github2.svg';
export const githubUrl = 'https://github.com';
export const leftNavText = [
  '2020',
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

export const pageLink = {
  '/': 1,
  '/node/': 2,
  '/library/': 3,
  '/site/': 4,
};

export const pageAssetFileName = {
  '/': 'main',
  '/node/': 'main',
  '/library/': 'main',
  '/site/': 'site',
};
