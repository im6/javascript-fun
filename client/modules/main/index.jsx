import '../layout';
import './style.less';

document.addEventListener("DOMContentLoaded", () => {
  let now = new Date();
  let dt = now.toDateString();
  const timeElem = document.getElementsByClassName('updateTxt')[0];
  timeElem.innerText = `Last Update:  ${dt}`;
});