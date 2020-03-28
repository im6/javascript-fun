import React from 'react';
import PropTypes from 'prop-types';

import Html from './Html';
import Layout from './Layout';

import {
  author,
  pageSpeedUrl,
  hideOwnerDetail,
  gitRepo,
  publicPath,
  leftNavText,
  iconCdnUrl,
  pageAssetFileName,
  topNavConfig,
} from '../../config';

const AppContainer = ({ url, children, criticalCss }) => (
  <Html
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
      leftNavText={leftNavText}
      author={author}
      pageSpeedUrl={pageSpeedUrl}
      gitRepo={gitRepo}
      year={leftNavText[0]}
      hideOwnerDetail={hideOwnerDetail}
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
