import { FC } from 'react';

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
}) => {
  const childDivStyle = 'pt-2 text-center text-neutral-500';
  const linkStyle = 'text-blue-500 ml-1';

  return (
    <footer className="p-0 mt-20 border-t-2">
      <div className={childDivStyle}>
        Full score &#9989; by
        <a
          href={pageSpeedUrl}
          className={linkStyle}
          target="_blank"
          rel="noopener"
        >
          Google PageSpeed
        </a>
      </div>
      <div className={childDivStyle}>
        &copy; Copyright {year}
        {hideAuthor ? (
          domain
        ) : (
          <a href="/about/" className={linkStyle}>
            <b>{author}</b>
          </a>
        )}
      </div>
      <div className={`${childDivStyle} pb-4`}>All rights reserved.</div>
    </footer>
  );
};

export default Footer;
