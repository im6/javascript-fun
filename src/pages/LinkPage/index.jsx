import React from 'react';
import PropTypes from 'prop-types';

import LinkBox from '../../components/LinkBox';
import BoxGroup from '../../components/BoxGroup';
import AppContainer from '../../components/AppContainer';

const LinkPage = ({ url, source, criticalCss }) => (
  <AppContainer url={url} criticalCss={criticalCss}>
    {source.map(v => (
      <BoxGroup key={v.id} title={v.name} isWebsite>
        {v.list.map(v1 => (
          <LinkBox key={v1.url} name={v1.name} desc={v1.desc} url={v1.url} />
        ))}
      </BoxGroup>
    ))}
  </AppContainer>
);

LinkPage.propTypes = {
  url: PropTypes.string,
  source: PropTypes.array,
  criticalCss: PropTypes.node,
};

export default LinkPage;
