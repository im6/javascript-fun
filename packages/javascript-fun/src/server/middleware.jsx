import fs from 'fs';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import { githubUrl, gitJsonPath, siteJsonPath } from 'app-constant';

import AppContainer from '../components/AppContainer';
import GitPage from '../pages/GitPage';
import LinkPage from '../pages/LinkPage';

import {
  nonLazyImg,
  iconCdnUrl,
  defaultIcon,
  topNavDict,
  renderOutputFolder,
} from '../config';

export const linkMd = (req, res) => {
  const rawdata = fs.readFileSync(
    path.resolve(process.cwd(), '../../', siteJsonPath)
  );
  const siteSource = JSON.parse(rawdata);
  const htmlDOM = (
    <AppContainer
      url={req.url}
      lastBuildDate={`${new Date().toLocaleString()} EST`}
    >
      <LinkPage source={siteSource} iconCdnUrl={iconCdnUrl} />
    </AppContainer>
  );
  const html = renderToStaticMarkup(htmlDOM);
  res.status(200);
  res.send(`<!DOCTYPE html>${html}`);
};

export const gitMd = (req, res) => {
  const rawdata = fs.readFileSync(
    path.resolve(process.cwd(), '../../', gitJsonPath)
  );
  const gitSource = JSON.parse(rawdata);
  const htmlDOM = (
    <AppContainer
      url={req.url}
      lastBuildDate={`${new Date().toLocaleString()} EST`}
    >
      <GitPage
        nonLazyImgIndex={nonLazyImg}
        source={gitSource.filter((v) => v.page === topNavDict[req.url].page)}
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
