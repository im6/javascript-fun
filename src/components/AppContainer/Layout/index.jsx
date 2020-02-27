import React from 'react';
import PropTypes from 'prop-types';
import Footer from './components/Footer';
import TopNav from './components/TopNav';
import SideBar from './components/Sidebar';

import style from './style.less';

const Layout = ({ url, children, leftNavText, author, year }) => (
  <div className="pure-g">
    <div className={`pure-u-1 pure-u-md-1-6 pure-u-lg-1-5 ${style.left}`}>
      <SideBar words={leftNavText} />
    </div>
    <div className={`pure-u-1 pure-u-md-5-6 pure-u-lg-4-5 ${style.right}`}>
      <TopNav url={url} />
      {children}
      <TopNav url={url} />
      <Footer author={author} year={year} />
    </div>
  </div>
);

Layout.propTypes = {
  url: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
  leftNavText: PropTypes.array,
};

export default Layout;
