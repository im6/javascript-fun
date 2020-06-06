import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SEO from './SEO';
import OpenGraph from './OpenGraph';

const MetaInfo = ({ author, lastBuildDate, year }) => (
  <Fragment>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <SEO year={year} />
    <OpenGraph />
    <meta name="author" content={author} />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=5"
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `if(window.location.hostname.indexOf('javascript.fun') > -1){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KQ9MZHN');console.log('last build: ${lastBuildDate}');}`,
      }}
    />
  </Fragment>
);

MetaInfo.propTypes = {
  author: PropTypes.string.isRequired,
  lastBuildDate: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};
export default MetaInfo;
