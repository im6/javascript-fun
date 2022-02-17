import Typed from 'typed.js';
import styleVars from './style';
import { leftNavText } from '../../config';

const { sidebarType, sidebarHeader } = styleVars;
const leftNavTextColors = [
  ['#7bd0ff', '#F38181'],
  ['#e8ec8b', '#57cc9d'],
  ['#EAFFD0', '#a7e5e4'],
  ['#ffb077', '#b0cadb'],
];

const typeElems = document.getElementsByClassName(
  sidebarType
) as HTMLCollectionOf<HTMLElement>;
const headerElems = document.getElementsByClassName(sidebarHeader);

if (typeElems.length && headerElems.length) {
  const [typeElem] = typeElems;
  const funTxtElem = (
    headerElems[0].children as HTMLCollectionOf<HTMLElement>
  )[1];
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
      const [typeCurosr] = document.getElementsByClassName(
        'typed-cursor'
      ) as HTMLCollectionOf<HTMLElement>;
      [typeElem.style.color] = selectedColor;
      [typeCurosr.style.color] = selectedColor;
      [, funTxtElem.style.color] = selectedColor;
    },
  });
} else {
  console.error('render error.'); // eslint-disable-line no-console
}
