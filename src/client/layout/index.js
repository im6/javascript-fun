import 'core-js/features/array';
import Typed from 'typed.js';
import { leftNavTextColors } from '../../config';
import style from '../../modules/Layout/components/Sidebar/style.less';

import './style.less';
import '../../modules/Layout/components/TopNav/style.less';
import '../../modules/Layout/components/Footer/style.less';
import '../../modules/Layout/components/Sidebar/style.less';
import '../../modules/BoxGroup/style.less';
import '../../modules/Layout/style.less';

const initTyped = () => {
  const typeElem = document.getElementsByClassName(style.type)[0];
  const funTxt = document.getElementsByClassName(style.header)[0].children[1];
  const colorNum = leftNavTextColors.length;

  new Typed(`.${style.type}`, {
    stringsElement: document.getElementsByClassName(style.typedStrings)[0],
    typeSpeed: 70,
    backSpeed: 40,
    smartBackspace: false,
    loop: true,
    autoInsertCss: true,
    preStringTyped: index => {
      const typeCurosr = document.getElementsByClassName('typed-cursor')[0];
      typeCurosr.style.color = leftNavTextColors[index % colorNum][0];
      typeElem.style.color = leftNavTextColors[index % colorNum][0];
      funTxt.style.color = leftNavTextColors[index % colorNum][1];
    },
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initTyped();
});
