import { FC } from 'react';
import style from './style.less';

interface LinkBoxProps {
  url: string;
  name: string;
  desc: string;
}

const LinkBox: FC<LinkBoxProps> = ({ url, name, desc }) => (
  <div
    className={`pure-u-xl-1-4 pure-u-lg-1-3 pure-u-md-1-2 pure-u-sm-1-2 pure-u-1-2 ${style.box}`}
  >
    <h3>
      <a href={url} title={desc}>
        {name}
      </a>
    </h3>
  </div>
);

export default LinkBox;
