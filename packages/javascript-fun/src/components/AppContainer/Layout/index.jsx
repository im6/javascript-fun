import PropTypes from 'prop-types';
import Footer from './components/Footer';
import TopNav from './components/TopNav';
import Slogan from './components/Slogan';
import Disqus from './components/Disqus';
import SideBar from './components/Sidebar';
import BackToTop from './components/BackToTop';
import GithubCorner from './components/GithubCorner';

import style from './style.less';

const Layout = ({
  url,
  year,
  domain,
  children,
  leftNavInitText,
  author,
  showDisqus,
  pageSpeedUrl,
  iconCdnUrl,
  topNavConfig,
  hideGithubCorner,
  gitRepo,
}) => {
  const selectedNavConfig = topNavConfig.filter((v) => v.to === url)[0];
  return (
    <div className="pure-g">
      <div className={`pure-u-1 pure-u-md-1-6 pure-u-lg-1-5 ${style.left}`}>
        <SideBar defaultType={leftNavInitText} />
      </div>
      <div className={`pure-u-1 pure-u-md-5-6 pure-u-lg-4-5 ${style.right}`}>
        <Slogan text="" />
        {!hideGithubCorner && <GithubCorner url={gitRepo} />}
        <TopNav
          url={url}
          topNavConfig={topNavConfig.filter((v) => v.alt !== 'add')}
          iconCdnUrl={iconCdnUrl}
        />
        {children}
        <TopNav
          url={url}
          topNavConfig={topNavConfig.filter(
            (v) => !(v.alt === 'add' && hideGithubCorner)
          )}
          iconCdnUrl={iconCdnUrl}
        />
        {showDisqus && (
          <Disqus
            title={`${domain}-${selectedNavConfig.title}`}
            identifier={selectedNavConfig.disqusId}
            canonicalUrl={`https://www.${domain}${url}`}
          />
        )}
        <Footer
          year={year}
          domain={domain}
          author={author}
          hideAuthor={hideGithubCorner}
          pageSpeedUrl={pageSpeedUrl}
        />
        <BackToTop iconCdnUrl={iconCdnUrl} />
      </div>
    </div>
  );
};

Layout.propTypes = {
  url: PropTypes.string.isRequired,
  iconCdnUrl: PropTypes.string.isRequired,
  domain: PropTypes.string,
  author: PropTypes.string.isRequired,
  pageSpeedUrl: PropTypes.string.isRequired,
  hideGithubCorner: PropTypes.bool,
  gitRepo: PropTypes.string.isRequired,
  showDisqus: PropTypes.bool.isRequired,
  year: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
  topNavConfig: PropTypes.array.isRequired,
  leftNavInitText: PropTypes.string.isRequired,
};

export default Layout;
