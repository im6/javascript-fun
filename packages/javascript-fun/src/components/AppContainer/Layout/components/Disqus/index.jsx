import PropTypes from 'prop-types';
import style from './style.less';

const Disqus = ({ title, canonicalUrl, identifier }) => (
  <div className={style.commentBox}>
    <div className={style.btnWrapper}>
      <button
        type="button"
        className={`pure-button pure-button-primary ${style.commentToggleBtn}`}
      >
        Display Comments
      </button>
    </div>
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

Disqus.propTypes = {
  title: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  canonicalUrl: PropTypes.string.isRequired,
};

export default Disqus;
