import React from 'react';
import PropTypes from 'prop-types';

import Html from './Html';
import Layout from './Layout';

import {
  author,
  pageSpeedUrl,
  hideGithubCorner,
  gitRepo,
  publicPath,
  leftNavText,
  iconCdnUrl,
  pageAssetFileName,
  topNavConfig,
  topNavDict,
} from '../../config';

const AppContainer = ({ url, children, criticalCss }) => (
  <Html
    title={topNavDict[url].title}
    year={leftNavText[0]}
    favIconUrl={`${iconCdnUrl}/fav.ico`}
    script={`${publicPath}/${pageAssetFileName[url]}.js`}
    style={`${publicPath}/${pageAssetFileName[url]}.css`}
    lastBuildDate={process.env.lastBuildDate}
    version={process.env.version}
    criticalCss={criticalCss}
    author={author}
  >
    <Layout
      url={url}
      iconCdnUrl={iconCdnUrl}
      topNavConfig={topNavConfig}
      leftNavInitText={leftNavText[5]}
      author={author}
      pageSpeedUrl={pageSpeedUrl}
      gitRepo={gitRepo}
      year={leftNavText[0]}
      hideGithubCorner={hideGithubCorner}
    >
      {children}
    </Layout>
  </Html>
);

AppContainer.propTypes = {
  url: PropTypes.string.isRequired,
  criticalCss: PropTypes.element,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
};

export default AppContainer;
