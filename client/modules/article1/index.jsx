import '../layout';
import './style.less';
import hljs from 'highlight.js';
import 'style-loader!css-loader!highlight.js/styles/railscasts.css';

document.addEventListener("DOMContentLoaded", () => {
  hljs.initHighlightingOnLoad();
});