import * as fs from 'fs';
import * as path from 'path';
import { Request, Response } from 'express';
import { renderToStaticMarkup } from 'react-dom/server';
import { githubUrl, gitJsonPath, siteJsonPath } from 'app-constant';

import AppContainer from '../components/AppContainer';
import GitPage from '../pages/GitPage';
import LinkPage from '../pages/LinkPage';
import { GitGroupSchema, LinkGroupSchema } from '../typings/interface';

import {
  nonLazyImg,
  iconCdnUrl,
  defaultIcon,
  topNavDict,
  renderOutputFolder,
} from '../config';

export const linkMd = (req: Request, res: Response) => {
  const rawdata = fs.readFileSync(
    path.resolve(process.cwd(), '../../', siteJsonPath)
  );
  const siteSource = JSON.parse(rawdata.toString()) as LinkGroupSchema[];
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

export const gitMd = (req: Request, res: Response) => {
  const rawdata = fs.readFileSync(
    path.resolve(process.cwd(), '../../', gitJsonPath)
  );
  const gitSource = JSON.parse(rawdata.toString()) as GitGroupSchema[];
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

export const staticHtml = (req: Request, res: Response) => {
  const fullPath = path.join(
    process.cwd(),
    renderOutputFolder,
    `${req.url}index.html`
  );
  console.log(fullPath);
  res.sendFile(fullPath);
};
