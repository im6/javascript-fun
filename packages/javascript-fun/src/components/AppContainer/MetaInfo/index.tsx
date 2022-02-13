import { FC, Fragment } from 'react';
import SEO from './SEO';
import OpenGraph from './OpenGraph';

interface MetaInfoProps {
  year: string;
  author: string;
  domain: string;
}

const MetaInfo: FC<MetaInfoProps> = ({ year, author, domain }) => (
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

export default MetaInfo;
