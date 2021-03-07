import fs from 'fs';
import { renderToStaticMarkup } from 'react-dom/server';

import AppContainer from '../components/AppContainer';
import GitPage from '../pages/GitPage';
import LinkPage from '../pages/LinkPage';

import {
  enableCdn,
  iconCdnUrl,
  githubUrl,
  defaultIcon,
  topNavDict,
  renderOutputFolder,
  viewModelPath,
  criticalAssetPath,
  nonLazyImg,
} from '../config';

const nowDate = `${new Date().toLocaleString()} EST`;

const generateGitPage = (url) => {
  const appJs = fs.readFileSync(criticalAssetPath.gitJs);
  const appCss = fs.readFileSync(criticalAssetPath.gitCss);
  const rawdata = fs.readFileSync(viewModelPath.git);
  const gitSource = JSON.parse(rawdata);
  const htmlDOM = (
    <AppContainer
      url={url}
      lastBuildDate={nowDate}
      criticalCss={<style dangerouslySetInnerHTML={{ __html: appCss }} />}
      criticalScript={
        enableCdn ? null : (
          <script dangerouslySetInnerHTML={{ __html: appJs }} />
        )
      }
    >
      <GitPage
        nonLazyImgIndex={nonLazyImg}
        source={gitSource.filter((v) => v.page === topNavDict[url].link)}
        githubUrl={githubUrl}
        iconCdnUrl={iconCdnUrl}
        defaultIcon={defaultIcon}
      />
    </AppContainer>
  );
  const html = `<!DOCTYPE html>${renderToStaticMarkup(htmlDOM)}`;
  const jsonOutputUrl = `${renderOutputFolder}${url}index.html`;
  fs.writeFileSync(jsonOutputUrl, html);
  console.log(`output ${url} success`);
};

const generateSitePage = (url) => {
  const appJs = fs.readFileSync(criticalAssetPath.siteJs);
  const appCss = fs.readFileSync(criticalAssetPath.siteCss);
  const rawdata = fs.readFileSync(viewModelPath.site);
  const siteSource = JSON.parse(rawdata);
  const htmlDOM = (
    <AppContainer
      url={url}
      lastBuildDate={nowDate}
      criticalCss={<style dangerouslySetInnerHTML={{ __html: appCss }} />}
      criticalScript={
        enableCdn ? null : (
          <script dangerouslySetInnerHTML={{ __html: appJs }} />
        )
      }
    >
      <LinkPage source={siteSource} iconCdnUrl={iconCdnUrl} />
    </AppContainer>
  );
  const html = `<!DOCTYPE html>${renderToStaticMarkup(htmlDOM)}`;
  const jsonOutputUrl = `${renderOutputFolder}${url}index.html`;
  fs.writeFileSync(jsonOutputUrl, html);
  console.log(`output ${url} success`);
};

if (!fs.existsSync(renderOutputFolder)) {
  fs.mkdirSync(renderOutputFolder);
  fs.mkdirSync(`${renderOutputFolder}/node`);
  fs.mkdirSync(`${renderOutputFolder}/library`);
  fs.mkdirSync(`${renderOutputFolder}/site`);
}

generateGitPage('/');
generateGitPage('/node/');
generateGitPage('/library/');
generateSitePage('/site/');
