import { FC } from 'react';
import numeral from 'numeral';
import style from './style.less';

interface GitBoxProps {
  url: string;
  name: string;
  img?: string;
  star: number;
  lazyImg?: string;
  inactiveDate: string;
}

const GitBox: FC<GitBoxProps> = ({
  name,
  url,
  img,
  star,
  lazyImg,
  inactiveDate,
}) => (
  <div
    className={`pure-u-xl-1-5 pure-u-lg-1-4 pure-u-md-1-3 pure-u-sm-1-2 pure-u-1-2 ${style.box}`}
  >
    <img src={img} alt={name} data-i={lazyImg} />
    <div className={style.rightText}>
      <h3>{name}</h3>
      <a href={url} aria-label={`${star} stars in Github`}>
        {inactiveDate ? (
          <span title={`It has been left unattended since ${inactiveDate}`}>
            &#128164;
          </span>
        ) : (
          <>&#9733;</>
        )}
        &nbsp;{numeral(star).format('0,0')}
      </a>
    </div>
  </div>
);

export default GitBox;
