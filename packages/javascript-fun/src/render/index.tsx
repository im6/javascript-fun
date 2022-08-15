import fs from 'fs';
import { resolve } from 'path';
import { renderToStaticNodeStream } from 'react-dom/server';
import { githubUrl, gitJsonPath, siteJsonPath } from 'app-constant';

import AppContainer from '../components/AppContainer';
import GitPage from '../pages/GitPage';
import LinkPage from '../pages/LinkPage';

const {
  iconCdnUrl,
  defaultIcon,
  topNavDict,
  renderOutputFolder,
  criticalAssetPath,
  nonLazyImg,
  adSenseUnits,
  adSenseClient,
} = require('../config');

import { GitGroupSchema, LinkGroupSchema } from '../typings/interface';

const enableCdn = false; // To enable CDN, it requires to commit dist folder into version control
const nowDate = `${new Date().toLocaleString()} EST`;

const generateGitPage = (url: string) => {
  const appJs = fs.readFileSync(criticalAssetPath.gitJs);
  const appCss = fs.readFileSync(criticalAssetPath.gitCss);
  const rawdata = fs.readFileSync(
    resolve(process.cwd(), '../../', gitJsonPath)
  );
  const gitSource = JSON.parse(rawdata.toString()) as GitGroupSchema[];
  const htmlDOM = (
    <AppContainer
      url={url}
      lastBuildDate={nowDate}
      criticalCss={
        <style dangerouslySetInnerHTML={{ __html: appCss.toString() }} />
      }
      criticalScript={
        enableCdn ? undefined : (
          <script dangerouslySetInnerHTML={{ __html: appJs.toString() }} />
        )
      }
    >
      <GitPage
        nonLazyImgIndex={nonLazyImg}
        source={gitSource.filter((v) => v.page === topNavDict[url].page)}
        githubUrl={githubUrl}
        iconCdnUrl={iconCdnUrl}
        defaultIcon={defaultIcon}
        adSenseUnits={adSenseUnits}
        adSenseClient={adSenseClient}
        adPositions={topNavDict[url].adPositions}
      />
    </AppContainer>
  );

  const jsonOutputUrl = `${renderOutputFolder}${url}index.html`;

  const contentStream = renderToStaticNodeStream(htmlDOM);

  const writableStream = fs.createWriteStream(jsonOutputUrl);
  writableStream.write('<!DOCTYPE html>');

  const stream = contentStream.pipe(writableStream);
  stream.on('finish', () => {
    console.log(`output ${url} success`);
  });
};

const generateSitePage = (url: string) => {
  const appJs = fs.readFileSync(criticalAssetPath.siteJs);
  const appCss = fs.readFileSync(criticalAssetPath.siteCss);
  const rawdata = fs.readFileSync(
    resolve(process.cwd(), '../../', siteJsonPath)
  );
  const siteSource = JSON.parse(rawdata.toString()) as LinkGroupSchema[];
  const htmlDOM = (
    <AppContainer
      url={url}
      lastBuildDate={nowDate}
      criticalCss={
        <style dangerouslySetInnerHTML={{ __html: appCss.toString() }} />
      }
      criticalScript={
        enableCdn ? undefined : (
          <script dangerouslySetInnerHTML={{ __html: appJs.toString() }} />
        )
      }
    >
      <LinkPage
        source={siteSource}
        iconCdnUrl={iconCdnUrl}
        adSenseUnits={adSenseUnits}
        adSenseClient={adSenseClient}
        adPositions={topNavDict['/site/'].adPositions}
      />
    </AppContainer>
  );

  const jsonOutputUrl = `${renderOutputFolder}${url}index.html`;

  const contentStream = renderToStaticNodeStream(htmlDOM);

  const writableStream = fs.createWriteStream(jsonOutputUrl);
  writableStream.write('<!DOCTYPE html>');

  const stream = contentStream.pipe(writableStream);
  stream.on('finish', () => {
    console.log(`output ${url} success`);
  });
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
