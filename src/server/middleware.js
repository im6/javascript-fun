import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Html from '../components/Html';
import Layout from '../components/Layout';
import BoxGroup from '../components/BoxGroup';
import GitBox from '../components/GitBox';
import LinkBox from '../components/LinkBox';

import gitSource from '../../public/github.json';
import siteSource from '../../public/site.json';
import {
  publicPath,
  leftNavText,
  iconCdnUrl,
  githubUrl,
  defaultIcon,
  pageLink,
  pageAssetFileName,
} from '../config';

const { version } = process.env;

export const linkMd = (req, res) => {
  const app = siteSource.list.map(v => {
    return (
      <BoxGroup key={v.id} title={v.name} isWebsite>
        {v.list.map(v1 => {
          return (
            <LinkBox key={v1.url} name={v1.name} desc={v1.desc} url={v1.url} />
          );
        })}
      </BoxGroup>
    );
  });
  const htmlDOM = (
    <Html
      year={leftNavText[0]}
      favIconUrl={`${iconCdnUrl}/fav.ico`}
      script={`${publicPath}/${pageAssetFileName[req.url]}.js`}
      style={`${publicPath}/${pageAssetFileName[req.url]}.css`}
      lastBuildDate={process.env.lastBuildDate || 'dev'}
      version={version}
    >
      <Layout page={pageLink[req.url]} leftNavText={leftNavText}>
        {app}
      </Layout>
    </Html>
  );
  const html = renderToStaticMarkup(htmlDOM);
  res.status(200);
  res.send(`<!DOCTYPE html>${html}`);
};

export const gitMd = (req, res) => {
  const app = gitSource
    .filter(v => v.page === pageLink[req.url])
    .map(v => {
      return (
        <BoxGroup key={v.id} title={v.name}>
          {v.list.map(v1 => {
            return (
              <GitBox
                key={v1.github}
                name={v1.name}
                img={`${iconCdnUrl}/${v1.img || defaultIcon}`}
                star={v1.star}
                url={`${githubUrl}/${v1.github}`}
              />
            );
          })}
        </BoxGroup>
      );
    });
  const htmlDOM = (
    <Html
      year={leftNavText[0]}
      favIconUrl={`${iconCdnUrl}/fav.ico`}
      style={`${publicPath}/${pageAssetFileName[req.url]}.css`}
      script={`${publicPath}/${pageAssetFileName[req.url]}.js`}
      lastBuildDate={process.env.lastBuildDate || 'dev'}
      version={version}
    >
      <Layout page={pageLink[req.url]} leftNavText={leftNavText}>
        {app}
      </Layout>
    </Html>
  );
  const html = renderToStaticMarkup(htmlDOM);
  res.status(200);
  res.send(`<!DOCTYPE html>${html}`);
};
