import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BoxGroup from '../../components/BoxGroup';
import LinkBox from '../../components/LinkBox';

const LinkPage = ({ source }) => (
  <Fragment>
    {source.map(v => (
      <BoxGroup key={v.id} title={v.name} isWebsite>
        {v.list.map(v1 => (
          <LinkBox key={v1.url} name={v1.name} desc={v1.desc} url={v1.url} />
        ))}
      </BoxGroup>
    ))}
  </Fragment>
);

LinkPage.propTypes = {
  source: PropTypes.array,
};

export default LinkPage;
