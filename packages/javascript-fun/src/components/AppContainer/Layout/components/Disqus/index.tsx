import { FC } from 'react';
import style from './style.less';

interface DisqusProps {
  title: string;
  identifier: string;
  canonicalUrl: string;
}

const Disqus: FC<DisqusProps> = ({ title, canonicalUrl, identifier }) => (
  <div className={style.commentBox}>
    <button
      type="button"
      className={`pure-button pure-button-primary ${style.commentToggleBtn}`}
    >
      &#128172; &nbsp; Display Comments
    </button>
    <div id="disqus_thread" />
    <script
      dangerouslySetInnerHTML={{
        __html: `var disqus_config=function(){this.page.url='${canonicalUrl}';this.page.identifier='${identifier}';this.page.title='${title}';};`,
      }}
    />
    <noscript>
      Please enable JavaScript to view the
      <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
    </noscript>
  </div>
);

export default Disqus;
