import './layout';
import '../components/GitBox/style.less';
import gitPageStyle from '../pages/GitPage/style.less';
import { debounce, getNow } from './util';
import { iconCdnUrl } from '../config';

const { updateTime } = gitPageStyle;

const defaultIcon = (function getIconFromDate() {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  if (month === 2 && day > 14 && day < 18) {
    return 'default-irish.svg';
  }
  if (month === 9 && day > 29) {
    return 'default-halloween.svg';
  }
  if (month === 11 && day > 19 && day < 26) {
    return 'default-xmas.svg';
  }
  return 'default-github-0.svg';
})();

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
    if (!i) continue;
    imgObj.src = `${iconCdnUrl}/${i}`;
    imgObj.removeAttribute('data-i');
  }
};

const renderDefaultIcon = () => {
  const imgElems = document.getElementsByTagName('img');
  const imgLen = imgElems.length;
  for (let j = 0; j < imgLen; j += 1) {
    const imgObj = imgElems[j];
    const src = imgObj.getAttribute('src');
    if (!src) {
      imgObj.src = `${iconCdnUrl}/${defaultIcon}`;
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
renderDefaultIcon();
