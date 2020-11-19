import PropTypes from 'prop-types';
import PureCss from '../PureCss';
import MetaInfo from '../MetaInfo';

const Html = ({
  title,
  favIconPngUrl,
  favIconSvgUrl,
  year,
  author,
  style,
  script,
  children,
  criticalCss,
  lastBuildDate,
}) => (
  <html lang="en">
    <head>
      <MetaInfo author={author} lastBuildDate={lastBuildDate} year={year} />
      <title>{title} | JavaScript Fun | 前端工坊 </title>

      <link rel="icon" type="image/svg+xml" href={favIconSvgUrl} />
      <link rel="mask-icon" href={favIconSvgUrl} color="#000000" />
      <link rel="alternate icon" type="image/png" href={favIconPngUrl} />

      <PureCss />
      {criticalCss || <link href={style} rel="stylesheet" />}
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
      <script src={script} type="text/javascript" />
    </body>
  </html>
);

Html.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  favIconPngUrl: PropTypes.string.isRequired,
  favIconSvgUrl: PropTypes.string.isRequired,
  lastBuildDate: PropTypes.string.isRequired,
  script: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  criticalCss: PropTypes.element,
};

export default Html;
