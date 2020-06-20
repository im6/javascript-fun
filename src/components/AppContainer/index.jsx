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
  topNavConfig,
  topNavDict,
  favIconPngUrl,
  favIconSvgUrl,
} from '../../config';

const AppContainer = ({ url, children, criticalCss }) => (
  <Html
    title={topNavDict[url].title}
    year={leftNavText[0]}
    favIconPngUrl={favIconPngUrl}
    favIconSvgUrl={favIconSvgUrl}
    script={`${publicPath}/${topNavDict[url].asset}.js?${process.env.version}`}
    style={`${publicPath}/${topNavDict[url].asset}.css?${process.env.version}`}
    lastBuildDate={process.env.lastBuildDate}
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
