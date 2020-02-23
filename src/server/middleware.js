import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Html from '../modules/Html';
import Layout from '../modules/Layout';

import BoxGroup from '../modules/BoxGroup';
import GitBox from '../modules/GitBox';
import source from '../../public/github.json';
import { iconCdnUrl, githubUrl, defaultIcon, pageLink } from '../config';

export const linkMd = (req, res) => {
  res.json({ hello: 'link' });
};

export const gitMd = (req, res) => {
  const app = (
    <div>
      {source
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
        })}
    </div>
  );
  const htmlDOM = (
    <Html
      title="jsfun"
      script="/main.js"
      lastBuildDate={process.env.lastBuildDate || 'dev'}
      version="abc"
    >
      <Layout page={pageLink[req.url]}>{app}</Layout>
    </Html>
  );
  const html = renderToStaticMarkup(htmlDOM);
  res.status(200);
  res.send(`<!DOCTYPE html>${html}`);
};
