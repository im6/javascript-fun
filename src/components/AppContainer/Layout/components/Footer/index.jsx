import React from 'react';
import PropTypes from 'prop-types';
import style from './style.less';

const Footer = ({ author, year }) => (
  <footer className={style.footer}>
    <span>
      &copy; Copyright {year}&nbsp;
      <a href="/about/" target="_blank">
        {author}
      </a>
      .&nbsp;All rights reserved. &#9989; by&nbsp;
      <a
        href="https://developers.google.com/speed/pagespeed/insights/?url=www.javascript.fun&tab=desktop"
        target="_blank"
        className={style.blue}
      >
        Google PageSpeed
      </a>
    </span>
  </footer>
);

Footer.propTypes = {
  author: PropTypes.string.isRequired,
};

export default Footer;
