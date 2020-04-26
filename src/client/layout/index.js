import Typed from 'typed.js';
import './style';

import { leftNavTextColors, leftNavText } from '../../config';
import {
  type,
  header,
} from '../../components/AppContainer/Layout/components/Sidebar/style.less';

const initTyped = () => {
  const typeElem = document.getElementsByClassName(type)[0];
  const funTxt = document.getElementsByClassName(header)[0].children[1];
  const colorNum = leftNavTextColors.length;

  typeElem.innerText = '';

  return new Typed(`.${type}`, {
    strings: leftNavText,
    typeSpeed: 70,
    backSpeed: 40,
    smartBackspace: false,
    loop: true,
    autoInsertCss: true,
    preStringTyped: (index) => {
      const typeCurosr = document.getElementsByClassName('typed-cursor')[0];
      typeCurosr.style.color = leftNavTextColors[index % colorNum][0]; // eslint-disable-line prefer-destructuring
      typeElem.style.color = leftNavTextColors[index % colorNum][0]; // eslint-disable-line prefer-destructuring
      funTxt.style.color = leftNavTextColors[index % colorNum][1]; // eslint-disable-line prefer-destructuring
    },
  });
};

initTyped();
