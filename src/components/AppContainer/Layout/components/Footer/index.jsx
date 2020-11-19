import PropTypes from 'prop-types';
import style from './style.less';

const Footer = ({ hideAuthor, author, year, pageSpeedUrl }) => (
  <footer className={style.footer}>
    <div>
      :) full score by&nbsp;
      <a
        href={pageSpeedUrl}
        className={style.blue}
        target="_blank"
        rel="noopener"
      >
        Google PageSpeed
      </a>
    </div>
    <div>
      &copy; Copyright {year}&nbsp;
      {hideAuthor ? (
        'Javascript.Fun'
      ) : (
        <a href="/about/">
          <b>{author}</b>
        </a>
      )}
    </div>
    <div>All rights reserved.</div>
  </footer>
);

Footer.propTypes = {
  author: PropTypes.string.isRequired,
  pageSpeedUrl: PropTypes.string.isRequired,
  hideAuthor: PropTypes.bool,
  year: PropTypes.string.isRequired,
};

export default Footer;
