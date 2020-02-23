import 'core-js/features/array';

import './style.less';
import '../../modules/Layout/components/TopNav/style.less';
import '../../modules/Layout/components/Footer/style.less';
import '../../modules/Layout/components/Sidebar/style.less';
import '../../modules/BoxGroup/style.less';
import '../../modules/GitBox/style.less';
import '../../modules/Layout/style.less';

import Typed from 'typed.js';
import { leftNavTextColors } from '../../config';

const init = () => {
  const typeElem = document.getElementsByClassName('type')[0];
  const funTxt = document.getElementById('sbttl2');
  const COLORCOUNT = leftNavTextColors.length;
  const dropdowns = document.getElementsByTagName('select');
  for (let i = 0; i < dropdowns.length; i += 1) {
    dropdowns[i].onchange = e => {
      window.location.href = e.target.value;
    };
  }

  new Typed('.type', {
    stringsElement: document.getElementById('typed-strings'),
    typeSpeed: 70,
    backSpeed: 50,
    smartBackspace: false,
    loop: true,
    autoInsertCss: false,
    preStringTyped: index => {
      const typeCurosr = document.getElementsByClassName('typed-cursor')[0];
      typeCurosr.style.color = leftNavTextColors[index % COLORCOUNT][0];
      typeElem.style.color = leftNavTextColors[index % COLORCOUNT][0];
      funTxt.style.color = leftNavTextColors[index % COLORCOUNT][1];
    },
  });
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});
