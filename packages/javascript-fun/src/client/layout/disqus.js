import { commentToggleBtn } from '../../components/AppContainer/Layout/components/Disqus/style.less';

const loadDisqus = () => {
  const d = document;
  const s = d.createElement('script');
  s.src = 'https://nyjs.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
};

const btns = document.getElementsByClassName(commentToggleBtn);
if (btns.length > 0) {
  const triggerBtn = btns[0];
  triggerBtn.addEventListener(
    'click',
    () => {
      loadDisqus();
      triggerBtn.remove();
    },
    { once: true }
  );
}
