import './layout';
import '../modules/GitBox/style.less';
import { updateTime } from '../modules/Layout/style.less';

const setTime = () => {
  const now = new Date();
  const dt = now.toDateString();
  const timeElem = document.getElementsByClassName(updateTime)[0];
  timeElem.innerText = `Last Update:  ${dt}`;
};

setTime();
