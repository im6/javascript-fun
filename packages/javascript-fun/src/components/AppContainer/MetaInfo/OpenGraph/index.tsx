import { FC, Fragment } from 'react';

interface OpenGraphProps {
  domain: string;
}

const ogTitle = 'JavaScript Fun | 前端工坊';
const ogDescription =
  'javascript top framework | front end library ranking | 前端框架 ｜ react vue angular';
const ogImgHeight = 640;
const ogImgWidth = 1280;
const ogImage =
  'https://repository-images.githubusercontent.com/87495174/70247f80-86ee-11ea-896f-b37b160f5a9b';

const OpenGraph: FC<OpenGraphProps> = ({ domain }) => (
  <Fragment>
    <meta property="og:title" content={ogTitle} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`https://www.${domain}`} />
    <meta property="og:description" content={ogDescription} />
    <meta property="og:site_name" content={domain} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:secure_url" content={ogImage} />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content={ogImgWidth.toString()} />
    <meta property="og:image:height" content={ogImgHeight.toString()} />
    <meta property="og:image:alt" content={domain} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={domain} />
    {/* <meta name="twitter:creator" content="creater name here" /> */}
    <meta name="twitter:title" content={ogTitle} />
    <meta name="twitter:description" content={ogDescription} />
    <meta name="twitter:image" content={ogImage} />
    <meta name="twitter:image:width" content={ogImgWidth.toString()} />
    <meta name="twitter:image:height" content={ogImgHeight.toString()} />
    <meta name="twitter:image:alt" content={domain} />
  </Fragment>
);

export default OpenGraph;
