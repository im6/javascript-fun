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
  crawlerConcurrency,
} from '../../config';

const privateFn = {
  collectStarNum: (db, resolve, reject) => {
    let unfinished = db;
    let finished = [];
    async.whilst(
      cb => {
        cb(null, unfinished.length > 0);
      },
      callback => {
        if (finished.length > 0) {
          console.log(`retry ${unfinished.length} pkgs...`); // eslint-disable-line no-console
        }
        privateFn.oneLoop(unfinished, (err, data) => {
          unfinished = data.filter(v => v.star === null);
          finished = finished.concat(data.filter(v => v.star !== null));
          callback(err, finished);
        });
      },
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      }
    );
  },
  oneLoop: (taskList, cb) => {
    const bar = new ProgressBar(
      'downloading :current of :total (:percent): :gtnm',
      {
        total: taskList.length,
      }
    );
    async.mapLimit(
      taskList,
      crawlerConcurrency,
      (v, cb1) => {
        bar.tick({ gtnm: v.name || v.github });
        privateFn.getNum(v, cb1);
      },
      (error, data) => {
        if (error) {
          cb(error);
          return;
        }
        cb(null, data);
      }
    );
  },

  getNum: (obj0, cb) => {
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
      .catch(() => {
        console.error(`crawler timeout on ${obj.name}`); // eslint-disable-line no-console
        cb(null, obj); // no err object, but collect failed items for next round.
      });
  },
};

export default () => {
  const deferred = new Promise((resolve, reject) => {
    const qr = 'SELECT *, NULL as star FROM git WHERE `group` IS NOT NULL'; //  AND id < 100
    sqlExecOne(qr).then(
      db => {
        privateFn.collectStarNum(db, resolve, reject);
      },
      err => {
        console.error('sql executed fails', err); // eslint-disable-line no-console
        reject(err);
      }
    );
  });

  return deferred;
};
