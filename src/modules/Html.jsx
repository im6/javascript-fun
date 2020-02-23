import React from 'react';
import PropTypes from 'prop-types';
import CriticalCss from './CriticalCss';
import MetaInfo from './MetaInfo';

const Html = ({ favIconUrl, year, script, children, version }) => (
  <html lang="en">
    <head>
      <MetaInfo />
      <title>
        JavaScript Fun | Most Popular JavaScript Framework in {year} | Top
        JavaScript Library | 前端框架 | web前端开发 | JS library Ranking
      </title>
      <link rel="shortcut icon" type="image/png" href={favIconUrl} />
      <CriticalCss />
    </head>
    <body>
      {children}
      <script src={`${script}?${version}`} type="text/javascript" />
    </body>
  </html>
);

Html.propTypes = {
  year: PropTypes.string.isRequired,
  favIconUrl: PropTypes.string.isRequired,
  lastBuildDate: PropTypes.string.isRequired,
  script: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default Html;
