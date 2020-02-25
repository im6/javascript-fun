import './layout';
import '../components/GitBox/style.less';
import { updateTime } from '../pages/GitPage/style.less';

const setTime = () => {
  const now = new Date();
  const dt = now.toDateString();
  const timeElem = document.getElementsByClassName(updateTime)[0];
  timeElem.innerText = `Last Update:  ${dt}`;
};

setTime();
