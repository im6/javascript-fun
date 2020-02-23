import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import AppContainer from '../components/AppContainer';
import GitPage from '../pages/GitPage';
import LinkPage from '../pages/LinkPage';

import gitSource from '../../public/github.json';
import siteSource from '../../public/site.json';

import { iconCdnUrl, githubUrl, defaultIcon, pageLink } from '../config';

export const linkMd = (req, res) => {
  const htmlDOM = (
    <AppContainer url={req.url}>
      <LinkPage source={siteSource.list} />
    </AppContainer>
  );
  const html = renderToStaticMarkup(htmlDOM);
  res.status(200);
  res.send(`<!DOCTYPE html>${html}`);
};

export const gitMd = (req, res) => {
  const htmlDOM = (
    <AppContainer url={req.url}>
      <GitPage
        source={gitSource.filter(v => v.page === pageLink[req.url])}
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
