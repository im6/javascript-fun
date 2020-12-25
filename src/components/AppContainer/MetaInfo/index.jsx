import { Fragment } from 'react';
import PropTypes from 'prop-types';
import SEO from './SEO';
import OpenGraph from './OpenGraph';

const MetaInfo = ({ author, year }) => (
  <Fragment>
    <meta charSet="utf-8" />
    <meta name="author" content={author} />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=5"
    />
    <SEO year={year} />
    <OpenGraph />
  </Fragment>
);

MetaInfo.propTypes = {
  author: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};
export default MetaInfo;
