import React from 'react';
import PropTypes from 'prop-types';

import AppContainer from '../../components/AppContainer';
import BoxGroup from '../../components/BoxGroup';
import GitBox from '../../components/GitBox';

import style from './style.less';
import sharedStyle from '../style.less';
import { directImgGrpNum } from '../../config';

const GitPage = ({
  url,
  source,
  githubUrl,
  iconCdnUrl,
  defaultIcon,
  criticalCss,
}) => (
  <AppContainer url={url} criticalCss={criticalCss}>
    <div className={sharedStyle.main}>
      {source.map((v, k) => {
        const lazyLoad = k > directImgGrpNum;
        return (
          <BoxGroup key={v.id} title={v.name}>
            {v.list.map(v1 => (
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
  </AppContainer>
);

GitPage.propTypes = {
  url: PropTypes.string,
  source: PropTypes.array,
  githubUrl: PropTypes.string,
  iconCdnUrl: PropTypes.string,
  defaultIcon: PropTypes.string,
  criticalCss: PropTypes.element,
};

export default GitPage;
