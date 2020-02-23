import React from 'react';
import PropTypes from 'prop-types';
import Footer from './components/Footer';
import TopNav from './components/TopNav';
import SideBar from './components/Sidebar';

import style from './style.less';

const Layout = ({ page, children, leftNavText }) => (
  <div className="pure-g">
    <div className={`pure-u-1 pure-u-md-1-6 pure-u-lg-1-5 ${style.left}`}>
      <SideBar words={leftNavText} />
    </div>
    <div className={`pure-u-1 pure-u-md-5-6 pure-u-lg-4-5 ${style.right}`}>
      <TopNav page={page} />
      <div className={style.main}>{children}</div>
      <p className={style.updateTime} />
      <TopNav page={page} />
      <Footer />
    </div>
  </div>
);

Layout.propTypes = {
  page: PropTypes.number,
  children: PropTypes.node,
  leftNavText: PropTypes.array,
};

export default Layout;
