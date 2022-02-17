import { FC } from 'react';
import classNames from 'classnames';
import style from './style.less';
import { TopNavConfigSchema } from '../../../../../typings/interface';

interface TopNavProps {
  url: string;
  iconCdnUrl: string;
  topNavConfig: TopNavConfigSchema[];
  showDarkSwitch?: boolean;
}

const TopNav: FC<TopNavProps> = ({
  url,
  topNavConfig,
  iconCdnUrl,
  showDarkSwitch,
}) => (
  <div className={`pure-button-group ${style.menubar}`} role="group">
    {topNavConfig.map((v: TopNavConfigSchema) => {
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
          href={isActivated ? undefined : v.to}
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

export default TopNav;
