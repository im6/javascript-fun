import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.less';

const TopNav = ({ url, topNavConfig, iconCdnUrl, showDarkSwitch }) => (
  <div className={`pure-button-group ${style.menubar}`} role="group">
    {topNavConfig.map((v) => {
      const isAddBtn = v.alt === 'add';
      const isActivated = v.to === url;
      return (
        <a
          key={v.to}
          className={classNames({
            'pure-button': true,
            'pure-button-active': isActivated,
            [style.success]: isAddBtn,
          })}
          title={v.title}
          href={isActivated ? null : v.to}
          aria-label={v.title}
          target={isAddBtn ? '_blank' : '_self'}
        >
          <img src={`${iconCdnUrl}/${v.img}`} alt={v.alt} />
        </a>
      );
    })}
    {showDarkSwitch && (
      <a href="#" title="Switch Dark Mode" className={style.darkSwitchBtn} />
    )}
  </div>
);

TopNav.prototype = {
  url: PropTypes.string.isRequired,
  iconCdnUrl: PropTypes.string.isRequired,
  topNavConfig: PropTypes.array.isRequired,
  showDarkSwitch: PropTypes.bool.isRequired,
};

export default TopNav;
