import { FC, Fragment } from 'react';

import GitBox from '../../components/GitBox';
import BoxGroup from '../../components/BoxGroup';
import AdUnit from '../../components/AppContainer/Layout/components/AdUnit';

import style from './style.less';
import sharedStyle from '../style.less';

import { GitGroupSchema } from '../../typings/interface';

interface GitPageProps {
  source: GitGroupSchema[];
  githubUrl: string;
  iconCdnUrl: string;
  defaultIcon: string;
  nonLazyImgIndex: number;
  adSenseClient: string;
  adSenseUnits: string[];
  adPositions: number[];
}

const GitPage: FC<GitPageProps> = ({
  source,
  githubUrl,
  iconCdnUrl,
  defaultIcon,
  nonLazyImgIndex,
  adPositions,
  adSenseClient,
  adSenseUnits,
}) => (
  <Fragment>
    <div className={sharedStyle.main}>
      {source.map((v, k) => {
        const lazyLoad = k > nonLazyImgIndex;
        const adIndex = adPositions.indexOf(k);
        return (
          <Fragment key={v.id}>
            <BoxGroup
              title={v.name}
              isWebsite={false}
              anchorId={v.anchorId}
              linkIconUrl={`${iconCdnUrl}/fa-link.svg`}
            >
              {v.list.map((v1) => (
                <GitBox
                  key={v1.github}
                  name={v1.name}
                  img={(!lazyLoad && v1.img) || defaultIcon}
                  imgSrc={iconCdnUrl}
                  star={v1.star}
                  url={`${githubUrl}/${v1.github}`}
                  lazyImg={lazyLoad ? v1.img : undefined}
                  inactiveDate={v1.inactiveDate}
                />
              ))}
            </BoxGroup>
            {adIndex > -1 && (
              <AdUnit client={adSenseClient} slot={adSenseUnits[adIndex]} />
            )}
          </Fragment>
        );
      })}
    </div>
    <h3 className={style.updateTime} />
  </Fragment>
);

export default GitPage;
