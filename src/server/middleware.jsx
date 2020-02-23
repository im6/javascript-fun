import React from 'react';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';

import GitPage from '../pages/GitPage';
import LinkPage from '../pages/LinkPage';

import gitSource from '../../dist/github.json';
import siteSource from '../../dist/site.json';

import {
  iconCdnUrl,
  githubUrl,
  defaultIcon,
  pageLink,
  renderOutputFolder,
} from '../config';

export const linkMd = (req, res) => {
  const htmlDOM = <LinkPage url={req.url} source={siteSource} />;
  const html = renderToStaticMarkup(htmlDOM);
  res.status(200);
  res.send(`<!DOCTYPE html>${html}`);
};

export const gitMd = (req, res) => {
  const htmlDOM = (
    <GitPage
      url={req.url}
      source={gitSource.filter(v => v.page === pageLink[req.url])}
      githubUrl={githubUrl}
      iconCdnUrl={iconCdnUrl}
      defaultIcon={defaultIcon}
    />
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
