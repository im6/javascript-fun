import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.less';
import { iconCdnUrl } from '../../../../config';

const getSelectedState = (currentPage, linkPage) => {
  return classNames({
    'pure-button': true,
    'pure-button-active': currentPage === linkPage,
  });
};

const TopNav = ({ page }) => {
  return (
    <div className={style.menubar}>
      <div className="pure-button-group" role="group">
        <a
          className={getSelectedState(page, 1)}
          title="Front End Framework"
          href="/"
        >
          <img src={`${iconCdnUrl}/vue.png`} alt="framework" />
        </a>
        <a
          className={getSelectedState(page, 2)}
          title="Node.js Framework"
          href="/node/"
        >
          <img src={`${iconCdnUrl}/mongo.png`} alt="node" />
        </a>
        <a
          className={getSelectedState(page, 3)}
          title="JS Library"
          href="/library/"
        >
          <img src={`${iconCdnUrl}/bower.png`} alt="library" />
        </a>
        <a className={getSelectedState(page, 4)} title="Tool" href="/site/">
          <img src={`${iconCdnUrl}/site.png`} alt="site" />
        </a>
      </div>
    </div>
  );
};

export default TopNav;
