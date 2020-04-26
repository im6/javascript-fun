import React from 'react';
import PropTypes from 'prop-types';
import PureCss from '../PureCss';
import MetaInfo from '../MetaInfo';

const Html = ({
  title,
  favIconUrl,
  year,
  author,
  style,
  script,
  children,
  version,
  criticalCss,
  lastBuildDate,
}) => (
  <html lang="en">
    <head>
      <MetaInfo author={author} lastBuildDate={lastBuildDate} year={year} />
      <title>{title} | JavaScript.Fun</title>
      <link rel="shortcut icon" type="image/png" href={favIconUrl} />
      <PureCss />
      {criticalCss || <link href={`${style}?${version}`} rel="stylesheet" />}
    </head>
    <body>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KQ9MZHN"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      {children}
      <script src={`${script}?${version}`} type="text/javascript" />
    </body>
  </html>
);

Html.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  favIconUrl: PropTypes.string.isRequired,
  lastBuildDate: PropTypes.string.isRequired,
  script: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  version: PropTypes.string,
  criticalCss: PropTypes.element,
};

export default Html;
