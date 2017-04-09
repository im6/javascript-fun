import 'style-loader!css-loader!purecss/build/pure-min.css';
import './style.less';
import './typed.less';

import '../assets/typed.min.js';
const TYPECOLOR = [
  "#ffefbc",
  "#95E1D3",
  "#FCE38A",
  "#F38181",
  "#EAFFD0",
  "#adc1f9",
  "#DDE8B9",
  "#F16B6F",
  "#E4F5E5",
  "#FF847B",
  "#88A6E5"
];

document.addEventListener("DOMContentLoaded", () =>{
  let typeElem = document.getElementsByClassName('type')[0],
    COLORCOUNT = TYPECOLOR.length;

  window.Typed.new(".type", {
    stringsElement: document.getElementById('typed-strings'),
    typeSpeed: 60,
    loop: true,
    preStringTyped: (index)=> {
      typeElem.style.color = TYPECOLOR[index% COLORCOUNT];
    },
  });
});
