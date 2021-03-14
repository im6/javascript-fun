import async from 'async';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import ProgressBar from 'progress';

import sqlExecOne from '../../db';
import { githubUrl } from '../../config';

const timeout = 5 * 1000;
const abusePauseTimeout = 30 * 1000;
const crawlerStepDelay = 2000;
const crawlerStepNum = 5;

const { MY_COOKIE: Cookie } = process.env;

const httpOptions = {
  timeout,
  headers: {
    Cookie,
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    Host: 'github.com',
  },
};

const fetchStarNum = (obj0, cb) => {
  const obj = { ...obj0 };
  fetch(`${githubUrl}/${obj.github}`, httpOptions)
    .then((res) => res.text())
    .then((body) => cheerio.load(body))
    .then(($) => {
      const elems = $('a.social-count.js-social-count');
      if (elems.length === 0) {
        console.error(` ${githubUrl}/${obj.github} url not found.`); // eslint-disable-line no-console
        obj.star = -1;
      } else {
        const starElem = elems[0];
        const numLabel = starElem.attribs['aria-label'];
        const numStr = numLabel.split(' ')[0];
        obj.star = parseInt(numStr, 10);
      }
      if (!obj.name) {
        [, obj.name] = obj.github.split('/');
      }

      cb(null, obj);
    })
    .catch((err) => {
      cb(err, obj);
    });
};

const oneLoop = (taskList, cb0) => {
  let abuseFlag = false;
  const bar = new ProgressBar('downloading :current of :total: :gtnm', {
    total: taskList.length,
  });
  async.mapSeries(
    taskList,
    (v, cb1) => {
      if (abuseFlag) {
        cb1(null, v);
      } else {
        bar.tick({ gtnm: v.name || v.github });
        fetchStarNum(v, (err, data) => {
          if (err && err.statusCode === 429) {
            console.error('\n Abuse detection mechanism triggered'); // eslint-disable-line no-console
            abuseFlag = true;
            cb1(null, v);
          } else {
            setTimeout(
              () => {
                cb1(null, data);
              },
              data.id % crawlerStepNum === 0 ? crawlerStepDelay : 0
            );
          }
        });
      }
    },
    cb0
  );
};

const collectStarNum = (db, cb0) => {
  let unfinished = db;
  let finished = [];
  async.whilst(
    (cb1) => {
      cb1(null, unfinished.length > 0);
    },
    (cb2) => {
      oneLoop(unfinished, (err, data) => {
        unfinished = data.filter((v) => v.star === null);
        finished = finished.concat(data.filter((v) => v.star !== null));
        const unfinishedLen = unfinished.length;
        if (unfinishedLen > 0) {
          // eslint-disable-next-line no-console
          console.log(
            `\n pause for ${
              abusePauseTimeout / 1000
            } secs for another ${unfinishedLen} pkgs ...`
          );
          setTimeout(() => {
            cb2(err, finished);
          }, abusePauseTimeout);
        } else {
          cb2(err, finished);
        }
      });
    },
    cb0
  );
};

export default async.seq(sqlExecOne, collectStarNum);
