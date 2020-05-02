import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import GitBox from '../../components/GitBox';
import BoxGroup from '../../components/BoxGroup';

import style from './style.less';
import sharedStyle from '../style.less';

const GitPage = ({
  source,
  githubUrl,
  iconCdnUrl,
  defaultIcon,
  nonLazyImgIndex,
}) => (
  <Fragment>
    <div className={sharedStyle.main}>
      {source.map((v, k) => {
        const lazyLoad = k > nonLazyImgIndex;
        return (
          <BoxGroup
            key={v.id}
            title={v.name}
            anchorId={v.anchorId}
            linkIconUrl={`${iconCdnUrl}/fa-link.svg`}
          >
            {v.list.map((v1) => (
              <GitBox
                key={v1.github}
                name={v1.name}
                img={lazyLoad ? defaultIcon : v1.img || defaultIcon}
                imgSrc={iconCdnUrl}
                star={v1.star}
                url={`${githubUrl}/${v1.github}`}
                lazyImg={lazyLoad ? v1.img : null}
              />
            ))}
          </BoxGroup>
        );
      })}
    </div>
    <h4 className={style.updateTime} />
  </Fragment>
);

GitPage.propTypes = {
  source: PropTypes.array,
  githubUrl: PropTypes.string,
  iconCdnUrl: PropTypes.string,
  defaultIcon: PropTypes.string,
  nonLazyImgIndex: PropTypes.number,
};

export default GitPage;
