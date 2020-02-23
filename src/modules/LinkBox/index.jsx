import React from 'react';
import PropTypes from 'prop-types';
import style from './style.less';

const LinkBox = ({ title, children, isWebsite }) => (
  <div>
    <h3 className={isWebsite ? style.websiteTitle : style.title}>{title}</h3>
    <div className="pure-g">{children}</div>
  </div>
);

LinkBox.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default LinkBox;
