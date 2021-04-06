import { Fragment } from 'react';
import PropTypes from 'prop-types';
import SEO from './SEO';
import OpenGraph from './OpenGraph';

const MetaInfo = ({ year, author, domain }) => (
  <Fragment>
    <meta charSet="utf-8" />
    <meta name="author" content={author} />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=5"
    />
    <SEO year={year} domain={domain} />
    <OpenGraph domain={domain} />
  </Fragment>
);

MetaInfo.propTypes = {
  year: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
};
export default MetaInfo;
