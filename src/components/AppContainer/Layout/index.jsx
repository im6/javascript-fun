import React from 'react';
import PropTypes from 'prop-types';
import Footer from './components/Footer';
import TopNav from './components/TopNav';
import SideBar from './components/Sidebar';
import GithubCorner from './components/GithubCorner';

import style from './style.less';

const Layout = ({
  url,
  children,
  leftNavText,
  author,
  pageSpeedUrl,
  iconCdnUrl,
  topNavConfig,
  hideGithubCorner,
  gitRepo,
  year,
}) => (
  <div className="pure-g">
    <div className={`pure-u-1 pure-u-md-1-6 pure-u-lg-1-5 ${style.left}`}>
      <SideBar words={leftNavText} />
    </div>
    <div className={`pure-u-1 pure-u-md-5-6 pure-u-lg-4-5 ${style.right}`}>
      {!hideGithubCorner && <GithubCorner url={gitRepo} />}
      <TopNav url={url} topNavConfig={topNavConfig} iconCdnUrl={iconCdnUrl} />
      {children}
      <TopNav url={url} topNavConfig={topNavConfig} iconCdnUrl={iconCdnUrl} />
      <Footer
        hideAuthor={hideGithubCorner}
        author={author}
        year={year}
        pageSpeedUrl={pageSpeedUrl}
      />
    </div>
  </div>
);

Layout.propTypes = {
  url: PropTypes.string.isRequired,
  iconCdnUrl: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  pageSpeedUrl: PropTypes.string.isRequired,
  hideGithubCorner: PropTypes.bool,
  gitRepo: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
  topNavConfig: PropTypes.array.isRequired,
  leftNavText: PropTypes.array,
};

export default Layout;
