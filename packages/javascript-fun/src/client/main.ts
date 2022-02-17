import './layout';
import '../components/GitBox/style.less';
import gitPageStyle from '../pages/GitPage/style.less';
import { debounce, getNow } from './util';
import { defaultIcon } from '../config';

const { updateTime } = gitPageStyle;

const setTime = () => {
  const timeElem = (
    document.getElementsByClassName(updateTime) as HTMLCollectionOf<HTMLElement>
  )[0];
  timeElem.innerText = `Last Update on ${getNow()}`;
};

const lazyLoadImg = () => {
  const imgElems = document.getElementsByTagName('img');
  const imgLen = imgElems.length;
  for (let j = 0; j < imgLen; j += 1) {
    const imgObj = imgElems[j];
    const { i } = imgObj.dataset;
    if (i) {
      imgObj.src = imgObj.src.replace(defaultIcon, i);
      imgObj.removeAttribute('data-i');
    }
  }
};

const initLazyLoad = debounce(
  () => {
    lazyLoadImg();
    window.removeEventListener('scroll', initLazyLoad);
  },
  500,
  true
);

window.addEventListener('scroll', initLazyLoad);
setTime();
