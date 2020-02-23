import fs from 'fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import GitPage from '../pages/GitPage';
import LinkPage from '../pages/LinkPage';

import gitSource from '../../public/github.json';
import siteSource from '../../public/site.json';

import {
  iconCdnUrl,
  githubUrl,
  defaultIcon,
  pageLink,
  renderOutputFolder,
} from '../config';

const generateGitPage = url => {
  const htmlDOM = (
    <GitPage
      url={url}
      source={gitSource.filter(v => v.page === pageLink[url])}
      githubUrl={githubUrl}
      iconCdnUrl={iconCdnUrl}
      defaultIcon={defaultIcon}
    />
  );
  const html = `<!DOCTYPE html>${renderToStaticMarkup(htmlDOM)}`;
  const jsonOutputUrl = `${renderOutputFolder}${url}index.html`;
  console.log(jsonOutputUrl);
  fs.writeFileSync(jsonOutputUrl, html);
  console.log(`output ${url} file`);
};

const generateSitePage = url => {
  const htmlDOM = <LinkPage url={url} source={siteSource.list} />;
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
