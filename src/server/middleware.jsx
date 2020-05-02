import fs from 'fs';
import React from 'react';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';

import AppContainer from '../components/AppContainer';
import GitPage from '../pages/GitPage';
import LinkPage from '../pages/LinkPage';

import {
  nonLazyImg,
  iconCdnUrl,
  githubUrl,
  defaultIcon,
  topNavDict,
  renderOutputFolder,
  viewModelPath,
} from '../config';

export const linkMd = (req, res) => {
  const rawdata = fs.readFileSync(viewModelPath.site);
  const siteSource = JSON.parse(rawdata);
  const htmlDOM = (
    <AppContainer url={req.url}>
      <LinkPage source={siteSource} iconCdnUrl={iconCdnUrl} />
    </AppContainer>
  );
  const html = renderToStaticMarkup(htmlDOM);
  res.status(200);
  res.send(`<!DOCTYPE html>${html}`);
};

export const gitMd = (req, res) => {
  const rawdata = fs.readFileSync(viewModelPath.git);
  const gitSource = JSON.parse(rawdata);
  const htmlDOM = (
    <AppContainer url={req.url}>
      <GitPage
        nonLazyImgIndex={nonLazyImg}
        source={gitSource.filter((v) => v.page === topNavDict[req.url].link)}
        githubUrl={githubUrl}
        iconCdnUrl={iconCdnUrl}
        defaultIcon={defaultIcon}
      />
    </AppContainer>
  );
  const html = renderToStaticMarkup(htmlDOM);
  res.status(200);
  res.send(`<!DOCTYPE html>${html}`);
};

export const staticHtml = (req, res) => {
  const fullPath = path.join(
    process.cwd(),
    renderOutputFolder,
    `${req.url}index.html`
  );
  console.log(fullPath);
  res.sendFile(fullPath);
};
