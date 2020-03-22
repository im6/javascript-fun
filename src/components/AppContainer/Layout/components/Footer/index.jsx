import React from 'react';
import PropTypes from 'prop-types';
import style from './style.less';

const Footer = ({ hideAuthor, author, year, pageSpeedUrl }) => (
  <footer className={style.footer}>
    <span>
      &copy; Copyright {year}&nbsp;
      {!hideAuthor ? (
        <a href="/about/" target="_blank">
          {author}
        </a>
      ) : (
        'Javascript.Fun'
      )}
      .&nbsp;All rights reserved. &#9989; by&nbsp;
      <a href={pageSpeedUrl} target="_blank" className={style.blue}>
        Google PageSpeed
      </a>
    </span>
  </footer>
);

Footer.propTypes = {
  author: PropTypes.string.isRequired,
  pageSpeedUrl: PropTypes.string.isRequired,
  hideAuthor: PropTypes.bool,
  year: PropTypes.number.isRequired,
};

export default Footer;
