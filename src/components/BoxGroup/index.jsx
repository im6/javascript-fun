import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './style.less';

const BoxGroup = ({ title, children, isWebsite }) => (
  <Fragment>
    <h2 className={isWebsite ? style.websiteTitle : style.title}>{title}</h2>
    <div className="pure-g">{children}</div>
    <br />
  </Fragment>
);

BoxGroup.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};

export default BoxGroup;
