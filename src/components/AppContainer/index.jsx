import React from 'react';
import PropTypes from 'prop-types';

import Html from './Html';
import Layout from './Layout';

import {
  author,
  publicPath,
  leftNavText,
  iconCdnUrl,
  pageAssetFileName,
} from '../../config';
const { version } = process.env;
const AppContainer = ({ url, children, criticalCss }) => (
  <Html
    year={leftNavText[0]}
    favIconUrl={`${iconCdnUrl}/fav.ico`}
    script={`${publicPath}/${pageAssetFileName[url]}.js`}
    style={`${publicPath}/${pageAssetFileName[url]}.css`}
    lastBuildDate={process.env.lastBuildDate || 'dev'}
    version={version}
    criticalCss={criticalCss}
    author={author}
  >
    <Layout
      url={url}
      leftNavText={leftNavText}
      author={author}
      year={leftNavText[0]}
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
