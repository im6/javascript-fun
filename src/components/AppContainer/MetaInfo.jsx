import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const MetaInfo = ({ author }) => (
  <Fragment>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="author" content={author} />
    <meta
      name="description"
      content="javascript top ranking, front end library"
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    />
    <meta
      name="keywords"
      content="javascript.fun,front end learning,web app,jsfun,react,vue,angular"
    />
    <meta name="google" content="notranslate" />
    <meta name="ROBOTS" content="INDEX,FOLLOW" />
    <script
      dangerouslySetInnerHTML={{
        __html: `if(window.location.hostname.indexOf('javascript.fun') > -1){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KQ9MZHN');}`,
      }}
    />
  </Fragment>
);

MetaInfo.propTypes = {
  author: PropTypes.string.isRequired,
};
export default MetaInfo;
