import { FC, Fragment } from 'react';
import classNames from 'classnames';
import style from './style.less';

interface BoxGroupProps {
  isWebsite: boolean;
  title: string;
  anchorId: string;
  linkIconUrl: string;
  children: JSX.Element[];
}

const BoxGroup: FC<BoxGroupProps> = ({
  title,
  linkIconUrl,
  anchorId,
  children,
  isWebsite,
}) => {
  const titleClasses = classNames({
    [style.title]: true,
    [style.webColor]: isWebsite,
    [style.gitColor]: !isWebsite,
  });
  return (
    <Fragment>
      <h2 id={anchorId} className={titleClasses}>
        <a href={`#${anchorId}`}>
          <img src={linkIconUrl} alt="anchor" />
        </a>
        {title}
      </h2>
      <div className="pure-g">{children}</div>
    </Fragment>
  );
};

export default BoxGroup;
