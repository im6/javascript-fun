import './font.less';
import '../../components/AppContainer/Layout/components/Slogan/style.less';
// import '../../components/AppContainer/Layout/components/TopNav/style.less'; // imported from color theme switch script
import '../../components/AppContainer/Layout/components/Footer/style.less';
import '../../components/AppContainer/Layout/components/GithubCorner/style.less';
import '../../components/AppContainer/Layout/components/AdUnit/style.less';
import '../../components/AppContainer/Layout/style.less';
import '../../components/BoxGroup/style.less';
import '../../pages/style.less'; // shared page style
import sidebarStyles from '../../components/AppContainer/Layout/components/Sidebar/style.less';
import backToTopStyles from '../../components/AppContainer/Layout/components/BackToTop/style.less';

export default {
  scrollBtn: backToTopStyles.scrollBtn,
  sidebarType: sidebarStyles.type,
  sidebarHeader: sidebarStyles.header,
};
