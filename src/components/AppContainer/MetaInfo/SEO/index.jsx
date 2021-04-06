import { Fragment } from 'react';
import PropTypes from 'prop-types';

const SEO = ({ year, domain }) => (
  <Fragment>
    <meta
      name="description"
      content={`Most Popular JavaScript Library ${year} Front End Framework Ranking 前端工坊 web框架 网站开发 编程必备`}
    />
    <meta
      name="keywords"
      content={`${domain},front end,web develop,react,vue,angular`}
    />
    <meta name="google" content="notranslate" />
    <meta name="robots" content="index,follow" />
  </Fragment>
);

SEO.propTypes = {
  year: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
};

export default SEO;
