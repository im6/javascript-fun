import 'style-loader!css-loader!purecss/build/pure-min.css';
import './style.less';
import './typed.less';

import '../assets/typed.min.js';
const TYPECOLOR = [
  "#8cffff",
  "#d2b9ff",
  "#95E1D3",
  "#FCE38A",
  "#85f3ff",
  "#F38181",
  "#adc1f9",
  "#7bd0ff",
  "#F16B6F",
  "#8cff93",
  "#FF847B",
  "#88A6E5",
  "#EAFFD0",
];

document.addEventListener("DOMContentLoaded", () =>{
  let typeElem = document.getElementsByClassName('type')[0],
    funTxt = document.getElementById('funTxt'),
    COLORCOUNT = TYPECOLOR.length;

  window.Typed.new(".type", {
    stringsElement: document.getElementById('typed-strings'),
    typeSpeed: 60,
    loop: true,
    preStringTyped: (index)=> {
      typeElem.style.color = TYPECOLOR[index% COLORCOUNT];
      funTxt.style.color = TYPECOLOR[(index +1) % COLORCOUNT];
    },
  });
});
