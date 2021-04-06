import PropTypes from 'prop-types';

import Html from './Html';
import Layout from './Layout';

import {
  author,
  domain,
  pageSpeedUrl,
  hideGithubCorner,
  gitRepo,
  publicPath,
  primaryYear,
  leftNavText,
  iconCdnUrl,
  topNavConfig,
  topNavDict,
  favIconPngUrl,
  favIconSvgUrl,
} from '../../config';

const AppContainer = ({
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
      hideGithubCorner={hideGithubCorner}
    >
      {children}
    </Layout>
  </Html>
);

AppContainer.propTypes = {
  url: PropTypes.string.isRequired,
  lastBuildDate: PropTypes.string.isRequired,
  criticalCss: PropTypes.element,
  criticalScript: PropTypes.element,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
};

export default AppContainer;
