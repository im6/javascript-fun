import React from 'react';
import PropTypes from 'prop-types';
import Footer from './components/Footer';
import TopNav from './components/TopNav';
import SideBar from './components/Sidebar';

import style from './style.less';

const Layout = ({ url, children, leftNavText }) => (
  <div className="pure-g">
    <div className={`pure-u-1 pure-u-md-1-6 pure-u-lg-1-5 ${style.left}`}>
      <SideBar words={leftNavText} />
    </div>
    <div className={`pure-u-1 pure-u-md-5-6 pure-u-lg-4-5 ${style.right}`}>
      <TopNav url={url} />
      <div className={style.main}>{children}</div>
      {url !== '/site/' && <p className={style.updateTime} />}
      <TopNav url={url} />
      <Footer />
    </div>
  </div>
);

Layout.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.array,
  leftNavText: PropTypes.array,
};

export default Layout;
