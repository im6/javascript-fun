import '../layout';
import './style.less';
import hljs from 'highlight.js/lib/highlight.js';
import 'style-loader!css-loader!highlight.js/styles/railscasts.css';
const jshl = require('highlight.js/lib/languages/javascript');

hljs.registerLanguage('javascript', jshl);
document.addEventListener("DOMContentLoaded", () => {
  hljs.initHighlightingOnLoad();
});