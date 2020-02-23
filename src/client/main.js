import './layout';
import style from '../modules/Layout/style.less';

const setTime = () => {
  const now = new Date();
  const dt = now.toDateString();
  const timeElem = document.getElementsByClassName(style.updateTime)[0];
  timeElem.innerText = `Last Update:  ${dt}`;
};

setTime();
