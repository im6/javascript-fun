import fs from 'fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import GitPage from '../pages/GitPage';
import LinkPage from '../pages/LinkPage';
import {
  iconCdnUrl,
  githubUrl,
  defaultIcon,
  pageLink,
  renderOutputFolder,
} from '../config';

const generateGitPage = url => {
  const css0 = fs.readFileSync('dist/public/main.css');
  const rawdata = fs.readFileSync('dist/github.json');
  const gitSource = JSON.parse(rawdata);
  const htmlDOM = (
    <GitPage
      url={url}
      source={gitSource.filter(v => v.page === pageLink[url])}
      githubUrl={githubUrl}
      iconCdnUrl={iconCdnUrl}
      defaultIcon={defaultIcon}
      criticalCss={<style dangerouslySetInnerHTML={{ __html: css0 }} />}
    />
  );
  const html = `<!DOCTYPE html>${renderToStaticMarkup(htmlDOM)}`;
  const jsonOutputUrl = `${renderOutputFolder}${url}index.html`;
  console.log(jsonOutputUrl);
  fs.writeFileSync(jsonOutputUrl, html);
  console.log(`output ${url} file`);
};

const generateSitePage = url => {
  const css1 = fs.readFileSync('dist/public/site.css');
  const rawdata = fs.readFileSync('dist/site.json');
  const siteSource = JSON.parse(rawdata);
  const htmlDOM = (
    <LinkPage
      url={url}
      source={siteSource}
      criticalCss={<style dangerouslySetInnerHTML={{ __html: css1 }} />}
    />
  );
  const html = `<!DOCTYPE html>${renderToStaticMarkup(htmlDOM)}`;
  const jsonOutputUrl = `${renderOutputFolder}${url}index.html`;
  console.log(jsonOutputUrl);
  fs.writeFileSync(jsonOutputUrl, html);
  console.log(`output ${url} file`);
};

if (!fs.existsSync(renderOutputFolder)) {
  fs.mkdirSync(`${renderOutputFolder}/node`);
  fs.mkdirSync(`${renderOutputFolder}/library`);
  fs.mkdirSync(`${renderOutputFolder}/site`);
}

generateGitPage('/');
generateGitPage('/node/');
generateGitPage('/library/');
generateSitePage('/site/');
