import styles from '../../components/AppContainer/Layout/components/TopNav/style.less';

const { menubar, menubarDark, darkSwitchBtn } = styles;
const storageKey = 'color-mode';
const { dataset } = document.body;
const btns = document.getElementsByClassName(
  darkSwitchBtn
) as HTMLCollectionOf<HTMLElement>;

if (!window.localStorage) {
  for (let i = 0; i < btns.length; i += 1) {
    btns[i].style.display = 'none';
  }
}

const navBtns = document.querySelectorAll(`.${menubar} .pure-button`);

const toggleOverwritePureBtn = (toAdd: boolean) => {
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

const savedColorMode = localStorage.getItem(storageKey);
const isSystemDarkMode = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches;

if (isSystemDarkMode || savedColorMode === 'dark') {
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
