import React from 'react';
import PropTypes from 'prop-types';
import style from './style.less';

const BoxGroup = ({ title, children, isWebsite }) => (
  <div>
    <h3 className={isWebsite ? style.websiteTitle : style.title}>{title}</h3>
    <div className="pure-g">{children}</div>
  </div>
);

BoxGroup.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};

export default BoxGroup;
