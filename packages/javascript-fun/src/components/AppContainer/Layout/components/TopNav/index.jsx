import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.less';

const TopNav = ({ url, topNavConfig, iconCdnUrl }) => (
  <div className={`pure-button-group ${style.menubar}`} role="group">
    {topNavConfig.map((v) => {
      const isAddBtn = v.alt === 'add';
      return (
        <a
          key={v.to}
          className={classNames({
            'pure-button': true,
            'pure-button-active': v.to === url,
            [style.success]: isAddBtn,
          })}
          title={v.title}
          href={v.to}
          aria-label={v.title}
          target={isAddBtn ? '_blank' : '_self'}
        >
          <img src={`${iconCdnUrl}/${v.img}`} alt={v.alt} />
        </a>
      );
    })}
  </div>
);

TopNav.prototype = {
  url: PropTypes.string.isRequired,
  iconCdnUrl: PropTypes.string.isRequired,
  topNavConfig: PropTypes.array.isRequired,
};

export default TopNav;
