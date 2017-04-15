import 'style-loader!css-loader!purecss/build/pure-min.css';
import 'style-loader!css-loader!purecss/build/grids-responsive-min.css';
import './style.less';
import './typed.less';

import '../../assets/typed.min.js';

const TYPECOLOR = [
  ["#7bd0ff","#F38181"],
  ["#e8ec8b","#57cc9d"],
  ["#88A6E5","#EAFFD0"],
  ["#ffb077","#b0cadb"],
];

document.addEventListener("DOMContentLoaded", () => {
  let typeElem = document.getElementsByClassName('type')[0],
    funTxt = document.getElementById('funTxt'),
    COLORCOUNT = TYPECOLOR.length;

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
});
