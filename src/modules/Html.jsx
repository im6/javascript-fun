import React from 'react';
import PropTypes from 'prop-types';
import PureCss from './CriticalCss';

const Html = ({ title, script, children, version }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title>{title}</title>
      <PureCss />
    </head>
    <body>
      {children}
      <script src={`${script}?${version}`} type="text/javascript" />
    </body>
  </html>
);

Html.propTypes = {
  title: PropTypes.string.isRequired,
  lastBuildDate: PropTypes.string.isRequired,
  script: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default Html;
