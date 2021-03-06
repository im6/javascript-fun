import PropTypes from 'prop-types';

import LinkBox from '../../components/LinkBox';
import BoxGroup from '../../components/BoxGroup';

import shareStyle from '../style.less';

const LinkPage = ({ source, iconCdnUrl }) => (
  <div className={shareStyle.main}>
    {source.map((v) => (
      <BoxGroup
        key={v.id}
        title={v.name}
        anchorId={v.anchorId}
        linkIconUrl={`${iconCdnUrl}/fa-link.svg`}
        isWebsite
      >
        {v.list.map((v1) => (
          <LinkBox key={v1.url} name={v1.name} desc={v1.desc} url={v1.url} />
        ))}
      </BoxGroup>
    ))}
  </div>
);

LinkPage.propTypes = {
  source: PropTypes.array.isRequired,
  iconCdnUrl: PropTypes.string.isRequired,
};

export default LinkPage;
