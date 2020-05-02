import React, { Fragment } from 'react';

const ogTitle = 'JavaScript Fun | 前端坊';
const ogSiteName = 'javascript.fun';
const ogDescription =
  'javascript top framework | front end library ranking | 前端框架 ｜ react vue angular';
const ogImgHeight = 640;
const ogImgWidth = 1280;
const ogImage =
  'https://repository-images.githubusercontent.com/87495174/70247f80-86ee-11ea-896f-b37b160f5a9b';

const OpenGraph = () => (
  <Fragment>
    <meta property="og:title" content={ogTitle} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.javascript.fun" />
    <meta property="og:description" content={ogDescription} />
    <meta property="og:site_name" content={ogSiteName} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:secure_url" content={ogImage} />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content={ogImgWidth} />
    <meta property="og:image:height" content={ogImgHeight} />
    <meta property="og:image:alt" content={ogSiteName} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={ogSiteName} />
    {/* <meta name="twitter:creator" content="ZJ Guo" /> */}
    <meta name="twitter:title" content={ogTitle} />
    <meta name="twitter:description" content={ogDescription} />
    <meta name="twitter:image" content={ogImage} />
    <meta name="twitter:image:width" content={ogImgWidth} />
    <meta name="twitter:image:height" content={ogImgHeight} />
    <meta name="twitter:image:alt" content={ogSiteName} />
  </Fragment>
);

export default OpenGraph;
