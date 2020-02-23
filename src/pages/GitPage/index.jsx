import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BoxGroup from '../../components/BoxGroup';
import GitBox from '../../components/GitBox';

const GitPage = ({ source, githubUrl, iconCdnUrl, defaultIcon }) => (
  <Fragment>
    {source.map(v => (
      <BoxGroup key={v.id} title={v.name}>
        {v.list.map(v1 => (
          <GitBox
            key={v1.github}
            name={v1.name}
            img={`${iconCdnUrl}/${v1.img || defaultIcon}`}
            star={v1.star}
            url={`${githubUrl}/${v1.github}`}
          />
        ))}
      </BoxGroup>
    ))}
  </Fragment>
);

GitPage.propTypes = {
  source: PropTypes.array,
  githubUrl: PropTypes.string,
  iconCdnUrl: PropTypes.string,
  defaultIcon: PropTypes.string,
};

export default GitPage;
