import PropTypes from 'prop-types';
import PureCss from '../PureCss';
import MetaInfo from '../MetaInfo';
import GoogleFont from '../GoogleFont';

const Html = ({
  title,
  domain,
  year,
  author,
  style,
  script,
  children,
  criticalCss,
  criticalScript,
  lastBuildDate,
  favIconPngUrl,
  favIconSvgUrl,
}) => (
  <html lang="en">
    <head>
      <MetaInfo author={author} year={year} domain={domain} />
      <title>{title} | JavaScript Fun | 前端工坊 </title>

      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="icon" type="image/svg+xml" href={favIconSvgUrl} />
      <link rel="mask-icon" href={favIconSvgUrl} color="#000000" />
      <link rel="alternate icon" type="image/png" href={favIconPngUrl} />
      <GoogleFont useLink={false} />
      <PureCss />
      {criticalCss || <link href={style} rel="stylesheet" />}

      <script
        dangerouslySetInnerHTML={{
          __html: `if(window.location.hostname.indexOf('${domain}') > -1){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KQ9MZHN');console.log('last build: ${lastBuildDate}');}`,
        }}
      />
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
      {criticalScript || <script src={script} type="text/javascript" />}
    </body>
  </html>
);

Html.propTypes = {
  year: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  favIconPngUrl: PropTypes.string.isRequired,
  favIconSvgUrl: PropTypes.string.isRequired,
  lastBuildDate: PropTypes.string.isRequired,
  script: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  criticalCss: PropTypes.element,
  criticalScript: PropTypes.element,
};

export default Html;
