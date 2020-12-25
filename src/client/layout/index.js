import Typed from 'typed.js';
import { sidebarType, sidebarHeader } from './style';
import { leftNavTextColors, leftNavText } from '../../config';

const typeElems = document.getElementsByClassName(sidebarType);
const headerElems = document.getElementsByClassName(sidebarHeader);

if (typeElems.length && headerElems.length) {
  const [typeElem] = typeElems;
  const funTxtElem = headerElems[0].children[1];
  const colorNum = leftNavTextColors.length;
  typeElem.innerText = '';

  // eslint-disable-next-line no-new
  new Typed(`.${sidebarType}`, {
    strings: leftNavText,
    typeSpeed: 70,
    backSpeed: 40,
    smartBackspace: false,
    loop: true,
    autoInsertCss: true,
    preStringTyped: (index) => {
      const selectedColor = leftNavTextColors[index % colorNum];
      const [typeCurosr] = document.getElementsByClassName('typed-cursor');
      [typeElem.style.color] = selectedColor;
      [typeCurosr.style.color] = selectedColor;
      [, funTxtElem.style.color] = selectedColor;
    },
  });
} else {
  console.error('render error.'); // eslint-disable-line no-console
}
