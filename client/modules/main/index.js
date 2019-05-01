import '../layout';
import './style.less';
import { debounce } from '../util';

const OSSURL = '//dkny.oss-cn-hangzhou.aliyuncs.com/1/icons';
const GITHUBURL = 'https://github.com';
const ICON = 'github2.svg'; // candidate: xmas.png, github2.svg, fireworks.png

const list = document.getElementsByClassName('box');
const len = list.length;
const step = [0, parseInt(len * 0.25), parseInt(len * 0.5), parseInt(len * 0.75), len];
let stepIndex = 0;

const setTime = () => {
  const now = new Date();
  const dt = now.toDateString();
  const timeElem = document.getElementsByClassName('updateTxt')[0];
  timeElem.innerText = `Last Update:  ${dt}`;
};

const setImg = (start, end) => {
  for (let j = start; j < end; j += 1) {
    const d1 = list[j];
    const { i, g, s } = d1.dataset;

    const iconUrl = i || ICON;
    const leftBox = d1.getElementsByClassName('boxLeft')[0];
    leftBox.innerHTML = `<img src="${OSSURL}/${iconUrl}">`;

    const rightBox = d1.getElementsByTagName('div')[2];
    rightBox.innerHTML = `<a href="${GITHUBURL}/${g}" target="_blank"><img src="${OSSURL}/github1.svg">${s}</a>`;
  }
};

const debounceLoadImage = debounce(() => {
  setImg(step[stepIndex], step[1 + stepIndex++]);
  if (step[stepIndex] === len) {
    window.removeEventListener('scroll', debounceLoadImage);
  }
}, 300);

setTime();
setImg(step[stepIndex], step[1 + stepIndex++]);

window.addEventListener('scroll', debounceLoadImage);
