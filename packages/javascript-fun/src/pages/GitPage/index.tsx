import { FC, Fragment } from 'react';

import GitBox from '../../components/GitBox';
import BoxGroup from '../../components/BoxGroup';
import AdUnit from '../../components/AppContainer/Layout/components/AdUnit';

import { GitGroupSchema } from '../../typings/interface';

interface GitPageProps {
  source: GitGroupSchema[];
  githubUrl: string;
  iconCdnUrl: string;
  nonLazyImgIndex: number;
  adSenseClient: string;
  adSenseUnits: string[];
  adPositions: number[];
}

const GitPage: FC<GitPageProps> = ({
  source,
  githubUrl,
  iconCdnUrl,
  nonLazyImgIndex,
  adPositions,
  adSenseClient,
  adSenseUnits,
}) => (
  <Fragment>
    <div className="pt-0 px-3 md:px-8">
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
              {v.list.map((v1) => {
                let img = v1.img ? `${iconCdnUrl}/${v1.img}` : '';
                let lazyImg;

                if (lazyLoad) {
                  img = '';
                  if (v1.img) {
                    lazyImg = v1.img;
                  }
                }

                return (
                  <GitBox
                    key={v1.github}
                    name={v1.name}
                    img={img}
                    star={v1.star}
                    url={`${githubUrl}/${v1.github}`}
                    lazyImg={lazyImg}
                    inactiveDate={v1.inactiveDate}
                  />
                );
              })}
            </BoxGroup>
            {adIndex > -1 && (
              <AdUnit client={adSenseClient} slot={adSenseUnits[adIndex]} />
            )}
          </Fragment>
        );
      })}
    </div>
    <h3 id="updateTime" className="text-center text-green-300 mt-10" />
  </Fragment>
);

export default GitPage;
