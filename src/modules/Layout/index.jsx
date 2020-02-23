import React from 'react';
import PropTypes from 'prop-types';
import Footer from './components/Footer';
import TopNav from './components/TopNav';
import SideBar from './components/Sidebar';

import { leftNavText, leftNavBgColor } from '../../config';
import style from './style.less';

const Layout = ({ page, children }) => (
  <div className="pure-g">
    <div
      className={`pure-u-1 pure-u-md-1-5 ${style.left}`}
      style={{ background: leftNavBgColor }}
    >
      <SideBar words={leftNavText} />
    </div>
    <div className={`pure-u-1 pure-u-md-4-5 ${style.right}`}>
      <TopNav page={page} />
      <div className={style.main}>{children}</div>
      <p className={style.updateTime} />
      <TopNav />
      <Footer />
    </div>
  </div>
);

Layout.propTypes = {
  page: PropTypes.number,
  children: PropTypes.node,
};

export default Layout;
