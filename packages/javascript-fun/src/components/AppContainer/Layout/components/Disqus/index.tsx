import { FC } from 'react';

interface DisqusProps {
  title: string;
  identifier: string;
  canonicalUrl: string;
}

const Disqus: FC<DisqusProps> = ({ title, canonicalUrl, identifier }) => (
  <div className="p-4 text-center">
    <button
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
