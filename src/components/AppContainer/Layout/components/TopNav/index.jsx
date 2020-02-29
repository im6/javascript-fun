import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.less';
import { iconCdnUrl, topNavConfig } from '../../../../../config';

const TopNav = ({ url }) => {
  return (
    <div className={style.menubar}>
      <div className="pure-button-group" role="group">
        {topNavConfig.map(v => (
          <a
            key={v.to}
            className={classNames({
              'pure-button': true,
              'pure-button-active': v.to === url,
            })}
            title={v.title}
            href={v.to}
            aria-label={v.title}
          >
            <img src={`${iconCdnUrl}/${v.img}`} alt={v.alt} />
          </a>
        ))}
      </div>
    </div>
  );
};

TopNav.prototype = {
  url: PropTypes.string.isRequired,
};

export default TopNav;
