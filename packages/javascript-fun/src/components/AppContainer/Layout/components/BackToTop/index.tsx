import { FC } from 'react';
import style from './style.less';

interface DisqusProps {
  iconCdnUrl: string;
}

const BackToTop: FC<DisqusProps> = ({ iconCdnUrl }) => (
  <div className={style.scrollBtn}>
    <img src={`${iconCdnUrl}/fa-chevron-up.svg`} alt="back to top" />
  </div>
);

export default BackToTop;
