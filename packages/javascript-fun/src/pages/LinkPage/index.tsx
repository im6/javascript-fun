import { FC, Fragment } from 'react';

import LinkBox from '../../components/LinkBox';
import BoxGroup from '../../components/BoxGroup';
import AdUnit from '../../components/AppContainer/Layout/components/AdUnit';

import shareStyle from '../style.less';

import { LinkGroupSchema } from '../../typings/interface';

interface LinkPageProps {
  source: LinkGroupSchema[];
  iconCdnUrl: string;
  adSenseClient: string;
  adSenseUnits: string[];
  adPositions: number[];
}

const LinkPage: FC<LinkPageProps> = ({
  source,
  iconCdnUrl,
  adSenseClient,
  adSenseUnits,
  adPositions,
}) => (
  <div className={shareStyle.main}>
    {source.map((v, k) => {
      const adIndex = adPositions.indexOf(k);
      return (
        <Fragment key={v.id}>
          <BoxGroup
            title={v.name}
            anchorId={v.anchorId}
            linkIconUrl={`${iconCdnUrl}/fa-link.svg`}
            isWebsite
          >
            {v.list.map((v1) => (
              <LinkBox
                key={v1.url}
                name={v1.name}
                desc={v1.desc}
                url={v1.url}
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
);

export default LinkPage;
