import '../layout';
import './style.less';

const OSSURL = '//dkny.oss-cn-hangzhou.aliyuncs.com/1/icons';
const GITHUBURL = 'https://github.com';
const ICON = 'github2.svg'; // candidate: xmas.png, github2.svg, fireworks.png

const setTime = () => {
  const now = new Date();
  const dt = now.toDateString();
  const timeElem = document.getElementsByClassName('updateTxt')[0];
  timeElem.innerText = `Last Update:  ${dt}`;
};

const setImg = () => {
  const list = document.getElementsByClassName('box');
  for (let j = 0; j < list.length; j += 1) {
    const d1 = list[j];
    const { i, g, s } = d1.dataset;

    const iconUrl = i || ICON;
    const leftBox = d1.getElementsByClassName('boxLeft')[0];
    leftBox.innerHTML = `<img src="${OSSURL}/${iconUrl}">`;

    const rightBox = d1.getElementsByTagName('div')[2];
    rightBox.innerHTML = `<a href="${GITHUBURL}/${g}" target="_blank"><img src="${OSSURL}/github1.svg">${s}</a>`;
  }
};

setTime();
setImg();
