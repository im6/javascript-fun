import { FC } from 'react';

import Footer from './components/Footer';
import TopNav from './components/TopNav';
import Slogan from './components/Slogan';
import Disqus from './components/Disqus';
import SideBar from './components/Sidebar';
import BackToTop from './components/BackToTop';
import GithubCorner from './components/GithubCorner';

import { TopNavConfigSchema } from '../../../typings/interface';

import style from './style.less';

interface LayoutProps {
  url: string;
  iconCdnUrl: string;
  domain: string;
  author: string;
  pageSpeedUrl: string;
  hideGithubCorner: boolean;
  gitRepo: string;
  showDisqus: boolean;
  year: string;
  children: JSX.Element;
  topNavConfig: TopNavConfigSchema[];
  leftNavInitText: string;
}

const Layout: FC<LayoutProps> = ({
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
          showDarkSwitch
          iconCdnUrl={iconCdnUrl}
          topNavConfig={topNavConfig.filter((v) => v.alt !== 'add')}
        />
        {children}
        <TopNav
          url={url}
          showDarkSwitch={false}
          topNavConfig={topNavConfig.filter(
            (v) => !(v.alt === 'add' && hideGithubCorner)
          )}
          iconCdnUrl={iconCdnUrl}
        />
        {showDisqus && (
          <Disqus
            title={`${domain}-${selectedNavConfig.title}`}
            identifier={selectedNavConfig.disqusId!}
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

export default Layout;
