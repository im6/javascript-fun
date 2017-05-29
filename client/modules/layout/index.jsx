import 'style-loader!css-loader!purecss/build/pure-min.css';
import 'style-loader!css-loader!purecss/build/grids-responsive-min.css';
import './style.less';
import './typed.less';
import './pureOverwrite.less';

import '../../assets/typed.min.js';

const TYPECOLOR = [
  ["#7bd0ff","#F38181"],
  ["#e8ec8b","#57cc9d"],
  ["#EAFFD0","#88A6E5"],
  ["#ffb077","#b0cadb"],
];

const init = () => {
  let typeElem = document.getElementsByClassName('type')[0],
    funTxt = document.getElementById('sbttl2'),
    COLORCOUNT = TYPECOLOR.length;

  let dropdowns = document.getElementsByTagName('select');
  for(let i = 0; i < dropdowns.length; i ++){
    dropdowns[i].onchange = (e) => {
      let v = e.target.value;
      window.location.href = v;
    }
  }

  window.Typed.new(".type", {
    stringsElement: document.getElementById('typed-strings'),
    typeSpeed: 70,
    loop: true,
    preStringTyped: (index)=> {
      let typeCurosr = document.getElementsByClassName('typed-cursor')[0];
      typeCurosr.style.color = TYPECOLOR[index% COLORCOUNT][0];
      typeElem.style.color = TYPECOLOR[index% COLORCOUNT][0];
      funTxt.style.color = TYPECOLOR[(index) % COLORCOUNT][1];
    },
  });
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});