import {
  menubar,
  menubarDark,
  darkSwitchBtn,
} from '../../components/AppContainer/Layout/components/TopNav/style.less';

const storageKey = 'color-mode';
const { dataset } = document.body;
const btns = document.getElementsByClassName(darkSwitchBtn);

if (!window.localStorage) {
  for (let i = 0; i < btns.length; i += 1) {
    btns[i].style.display = 'none';
  }
}

const navBtns = document.querySelectorAll(`.${menubar} .pure-button`);

const toggleOverwritePureBtn = (toAdd) => {
  if (toAdd) {
    for (let j = 0; j < navBtns.length; j += 1) {
      navBtns[j].classList.add(menubarDark);
    }
  } else {
    for (let j = 0; j < navBtns.length; j += 1) {
      navBtns[j].classList.remove(menubarDark);
    }
  }
};

const initColorMode = localStorage.getItem(storageKey);
if (initColorMode === 'dark') {
  dataset.colorMode = 'dark';
  toggleOverwritePureBtn(true);
}

if (btns.length > 0) {
  btns[0].addEventListener('click', () => {
    if (dataset.colorMode === 'dark') {
      dataset.colorMode = 'light';
      localStorage.setItem(storageKey, 'light');
      toggleOverwritePureBtn(false);
    } else {
      dataset.colorMode = 'dark';
      localStorage.setItem(storageKey, 'dark');
      toggleOverwritePureBtn(true);
    }
  });
}
