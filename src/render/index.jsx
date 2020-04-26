import fs from 'fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import AppContainer from '../components/AppContainer';
import GitPage from '../pages/GitPage';
import LinkPage from '../pages/LinkPage';

import {
  iconCdnUrl,
  githubUrl,
  defaultIcon,
  topNavDict,
  renderOutputFolder,
  viewModelPath,
  criticalCssPath,
  nonLazyImg,
} from '../config';

const generateGitPage = (url) => {
  const appCss = fs.readFileSync(criticalCssPath.git);
  const rawdata = fs.readFileSync(viewModelPath.git);
  const gitSource = JSON.parse(rawdata);
  const htmlDOM = (
    <AppContainer
      url={url}
      criticalCss={<style dangerouslySetInnerHTML={{ __html: appCss }} />}
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
  const appCss = fs.readFileSync(criticalCssPath.site);
  const rawdata = fs.readFileSync(viewModelPath.site);
  const siteSource = JSON.parse(rawdata);
  const htmlDOM = (
    <AppContainer
      url={url}
      criticalCss={<style dangerouslySetInnerHTML={{ __html: appCss }} />}
    >
      <LinkPage source={siteSource} />
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
