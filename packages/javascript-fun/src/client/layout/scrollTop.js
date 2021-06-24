import { debounce } from '../util';
import { scrollBtn } from './style';

const scrollDelay = 500;
const showBtnPositionY = 100;
const scrollTopElems = document.getElementsByClassName(scrollBtn);

if (scrollTopElems.length) {
  const btn = scrollTopElems[0];
  const toggleBtn = (visible) => {
    if (visible) {
      btn.style.opacity = 1;
      btn.style.visibility = 'visible';
    } else {
      btn.style.opacity = 0;
      btn.style.visibility = 'hidden';
    }
  };
  const handleBtnVisibility = () => {
    const distance = window.scrollY;
    toggleBtn(distance > showBtnPositionY);
  };

  window.addEventListener('scroll', debounce(handleBtnVisibility, scrollDelay));
  btn.addEventListener('click', () => {
    window.scrollTo(0, 0);
    toggleBtn(false);
  });
} else {
  console.error('render error.'); // eslint-disable-line no-console
}
