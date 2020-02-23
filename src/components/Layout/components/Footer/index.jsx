import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './style.less';

const Footer = () => (
  <footer className={style.footer}>
    <span>
      Made with &nbsp;
      <svg
        id="Livello_1"
        enableBackground="new -0.709 -11.555 141.732 141.732"
        height="21px"
        width="21px"
        fill="#ea7a7a"
        version="1.1"
        viewBox="-0.709 -11.555 141.732 141.732"
      >
        <g id="Livello_82"></g>
        <path d="M140.314,37.654C140.314,16.858,123.402,0,102.537,0c-13.744,0-25.77,7.317-32.379,18.255C63.549,7.317,51.521,0,37.777,0   C16.912,0,0,16.858,0,37.654c0,10.821,4.588,20.57,11.922,27.438h-0.01l54.084,51.584c0.992,1.188,2.48,1.945,4.148,1.945   c1.545,0,2.936-0.653,3.92-1.696l54.346-51.833h-0.016C135.729,58.225,140.314,48.476,140.314,37.654"></path>
        <g id="Livello_1_1_"></g>
      </svg>
      &nbsp;by &nbsp;
      <a href="/about/" target="_blank">
        ZJ Guo
      </a>
    </span>
  </footer>
);

Footer.propTypes = {
  children: PropTypes.node,
};

export default Footer;
