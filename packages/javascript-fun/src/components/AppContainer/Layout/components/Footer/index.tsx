import { FC } from 'react';
import style from './style.less';

interface FooterProps {
  domain: string;
  author: string;
  pageSpeedUrl: string;
  hideAuthor: boolean;
  year: string;
}

const Footer: FC<FooterProps> = ({
  domain,
  hideAuthor,
  author,
  year,
  pageSpeedUrl,
}) => (
  <footer className={style.footer}>
    <div>
      Full score &#9989;&nbsp;&nbsp;by&nbsp;
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
        domain
      ) : (
        <a href="/about/">
          <b>{author}</b>
        </a>
      )}
    </div>
    <div>All rights reserved.</div>
  </footer>
);

export default Footer;
