import { FC } from 'react';
import style from './style.less';

interface AdUnitProps {
  slot: string;
  client: string;
}

const AdUnit: FC<AdUnitProps> = ({ client, slot }) => (
  <div className={style.adContainer}>
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
    <script
      dangerouslySetInnerHTML={{
        __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
      }}
    />
  </div>
);

export default AdUnit;
