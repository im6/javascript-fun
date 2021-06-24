import PropTypes from 'prop-types';

const GoogleFont = ({ useLink }) =>
  useLink ? (
    <link
      href="https://fonts.googleapis.com/css2?family=Oxygen&display=swap"
      rel="stylesheet"
    />
  ) : (
    <style
      dangerouslySetInnerHTML={{
        __html: `@font-face { font-family: 'Oxygen'; font-style: normal; font-weight: 400; font-display: swap; src: url(https://fonts.gstatic.com/s/oxygen/v10/2sDfZG1Wl4LcnbuKjk0m.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }`,
      }}
    />
  );

GoogleFont.propTypes = {
  useLink: PropTypes.bool,
};
export default GoogleFont;
