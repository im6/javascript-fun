import { FC } from 'react';

import Html from './Html';
import Layout from './Layout';

const {
  author,
  domain,
  pageSpeedUrl,
  hideGithubCorner,
  gitRepo,
  showDisqus,
  publicPath,
  primaryYear,
  leftNavText,
  iconCdnUrl,
  topNavConfig,
  topNavDict,
  favIconPngUrl,
  favIconSvgUrl,
} = require('../../config');

interface AppContainerProps {
  url: string;
  lastBuildDate: string;
  criticalCss?: JSX.Element;
  criticalScript?: JSX.Element;
  children: JSX.Element;
}

const AppContainer: FC<AppContainerProps> = ({
  url,
  children,
  criticalCss,
  criticalScript,
  lastBuildDate,
}) => (
  <Html
    domain={domain}
    title={topNavDict[url].title}
    year={primaryYear}
    favIconPngUrl={favIconPngUrl}
    favIconSvgUrl={favIconSvgUrl}
    script={`${publicPath}/${topNavDict[url].asset}.js`}
    style={`${publicPath}/${topNavDict[url].asset}.css`}
    lastBuildDate={lastBuildDate}
    criticalCss={criticalCss}
    criticalScript={criticalScript}
    author={author}
  >
    <Layout
      url={url}
      domain={domain}
      year={primaryYear}
      iconCdnUrl={iconCdnUrl}
      topNavConfig={topNavConfig}
      leftNavInitText={leftNavText[5]}
      author={author}
      pageSpeedUrl={pageSpeedUrl}
      gitRepo={gitRepo}
      showDisqus={showDisqus}
      hideGithubCorner={hideGithubCorner}
    >
      {children}
    </Layout>
  </Html>
);

export default AppContainer;
