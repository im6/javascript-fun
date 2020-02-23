import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.less';
import { iconCdnUrl, pageLink } from '../../../../config';

const getSelectedState = (currentPage, link) => {
  return classNames({
    'pure-button': true,
    'pure-button-active': currentPage === pageLink[link],
  });
};

const TopNav = ({ page }) => {
  return (
    <div className={style.menubar}>
      <div className="pure-button-group" role="group">
        <a
          className={getSelectedState(page, '/')}
          title="Front End Framework"
          href="/"
        >
          <img src={`${iconCdnUrl}/vue.png`} alt="framework" />
        </a>
        <a
          className={getSelectedState(page, '/node/')}
          title="Node.js Framework"
          href="/node/"
        >
          <img src={`${iconCdnUrl}/mongo.png`} alt="node" />
        </a>
        <a
          className={getSelectedState(page, '/library/')}
          title="JS Library"
          href="/library/"
        >
          <img src={`${iconCdnUrl}/bower.png`} alt="library" />
        </a>
        <a
          className={getSelectedState(page, '/site/')}
          title="Tool"
          href="/site/"
        >
          <img src={`${iconCdnUrl}/site.png`} alt="site" />
        </a>
      </div>
    </div>
  );
};

export default TopNav;
