import Typed from 'typed.js';

import './style.less';
import '../../components/AppContainer/Layout/components/TopNav/style.less';
import '../../components/AppContainer/Layout/components/Footer/style.less';
import '../../components/AppContainer/Layout/components/Sidebar/style.less';
import '../../components/AppContainer/Layout/style.less';
import '../../components/BoxGroup/style.less';

import { leftNavTextColors } from '../../config';
import {
  type,
  header,
  typedStrings,
} from '../../components/AppContainer/Layout/components/Sidebar/style.less';

const initTyped = () => {
  const typeElem = document.getElementsByClassName(type)[0];
  const funTxt = document.getElementsByClassName(header)[0].children[1];
  const colorNum = leftNavTextColors.length;

  new Typed(`.${type}`, {
    stringsElement: document.getElementsByClassName(typedStrings)[0],
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
