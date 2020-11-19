import { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.less';

const BoxGroup = ({ title, linkIconUrl, anchorId, children, isWebsite }) => {
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
      <br />
    </Fragment>
  );
};

BoxGroup.propTypes = {
  isWebsite: PropTypes.bool,
  title: PropTypes.string.isRequired,
  anchorId: PropTypes.string.isRequired,
  linkIconUrl: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};

export default BoxGroup;
