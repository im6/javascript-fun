import Typed from 'typed.js';
import './style';

import { leftNavTextColors, leftNavText } from '../../config';
import {
  type,
  header,
} from '../../components/AppContainer/Layout/components/Sidebar/style.less';

const typeElems = document.getElementsByClassName(type);
const headerElems = document.getElementsByClassName(header);

if (typeElems.length && headerElems.length) {
  const typeElem = typeElems[0];
  const funTxtElem = headerElems[0].children[1];
  const colorNum = leftNavTextColors.length;
  typeElem.innerText = '';

  // eslint-disable-next-line no-new
  new Typed(`.${type}`, {
    strings: leftNavText,
    typeSpeed: 70,
    backSpeed: 40,
    smartBackspace: false,
    loop: true,
    autoInsertCss: true,
    preStringTyped: (index) => {
      const selectedColor = leftNavTextColors[index % colorNum];
      const [typeCurosr] = document.getElementsByClassName('typed-cursor');
      typeElem.style.color = selectedColor[0]; // eslint-disable-line prefer-destructuring
      typeCurosr.style.color = selectedColor[0]; // eslint-disable-line prefer-destructuring
      funTxtElem.style.color = selectedColor[1]; // eslint-disable-line prefer-destructuring
    },
  });
} else {
  console.error('render error.'); // eslint-disable-line no-console
}
