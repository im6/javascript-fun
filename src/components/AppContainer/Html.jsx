import React from 'react';
import PropTypes from 'prop-types';
import PureCss from './PureCss';
import MetaInfo from './MetaInfo';

const Html = ({
  favIconUrl,
  year,
  style,
  script,
  children,
  version,
  criticalCss,
}) => (
  <html lang="en">
    <head>
      <MetaInfo />
      <title>
        JavaScript Fun | Most Popular JavaScript Framework in {year} | Top
        JavaScript Library | 前端框架 | web前端开发 | JS library Ranking
      </title>
      <link rel="shortcut icon" type="image/png" href={favIconUrl} />
      <PureCss />
      {criticalCss || <link href={`${style}?${version}`} rel="stylesheet" />}
    </head>
    <body>
      {children}
      <script src={`${script}?${version}`} type="text/javascript" />
    </body>
  </html>
);

Html.propTypes = {
  year: PropTypes.number.isRequired,
  favIconUrl: PropTypes.string.isRequired,
  lastBuildDate: PropTypes.string.isRequired,
  script: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  version: PropTypes.string,
  criticalCss: PropTypes.node,
};

export default Html;
