import { FC } from 'react';

interface AdUnitProps {
  slot: string;
  client: string;
}

const AdUnit: FC<AdUnitProps> = ({ client, slot }) => (
  <div className="mt-1 p-0 border-0 border-neutral-300 rounded-md overflow-hidden md:border-2 md:p-2 md:mt-5">
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
