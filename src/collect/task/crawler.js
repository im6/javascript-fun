import async from 'async';
import cheerio from 'cheerio';
import numeral from 'numeral';
import rp from 'request-promise';
import ProgressBar from 'progress';

import sqlExecOne from '../mysqlConnection';
import {
  githubUrl,
  crawlerTimeout as timeout,
  crawlerShowFullNumber,
  abusePauseTimeout,
  crawlerStepDelay,
} from '../../config';

const getNum = (obj0, cb) => {
  const obj = { ...obj0 };
  rp({
    uri: `${githubUrl}/${obj.github}`,
    timeout,
    transform: body => cheerio.load(body),
  })
    .then($ => {
      const elems = $('a.social-count.js-social-count');
      const starElem = elems[0];
      if (crawlerShowFullNumber) {
        const numLabel = starElem.attribs['aria-label'];
        const numStr = numLabel.split(' ')[0];
        const num = numeral(numStr).format('0,0');
        obj.star = num;
      } else {
        const num = starElem.children[0].data.trim();
        obj.star = num;
      }

      if (obj.name.length === 0) {
        // empty string
        const gitList = obj.github.split('/');
        [, obj.name] = gitList;
      }

      cb(null, obj);
    })
    .catch(err => {
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
      bar.tick({ gtnm: v.name || v.github });
      if (abuseFlag) cb1(null, v);
      else {
        getNum(v, (err, data) => {
          if (err) {
            abuseFlag = true;
            cb1(null, v);
          } else {
            setTimeout(() => {
              cb1(null, data);
            }, crawlerStepDelay);
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
    cb1 => {
      cb1(null, unfinished.length > 0);
    },
    cb2 => {
      oneLoop(unfinished, (err, data) => {
        unfinished = data.filter(v => v.star === null);
        finished = finished.concat(data.filter(v => v.star !== null));
        const unfinishedLen = unfinished.length;
        if (unfinishedLen > 0) {
          // eslint-disable-next-line no-console
          console.log(
            `pause for ${abusePauseTimeout /
              1000} secs for another ${unfinishedLen} pkgs ...`
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
