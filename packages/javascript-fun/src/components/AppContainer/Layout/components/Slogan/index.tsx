import { FC } from 'react';
import style from './style.less';

interface SloganProps {
  text: string;
}

const Slogan: FC<SloganProps> = ({ text }) => {
  if (!text) return null;
  return <h1 className={style.colorText}>{text}</h1>;
};

export default Slogan;
