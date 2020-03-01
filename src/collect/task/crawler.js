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
    .catch(() => {
      console.error(`crawler timeout on ${obj.name}`); // eslint-disable-line no-console
      cb(null, obj); // no err object, but collect failed items for next round.
    });
};

const oneLoop = (taskList, cb0) => {
  const bar = new ProgressBar('downloading :current of :total: :gtnm', {
    total: taskList.length,
  });
  async.mapLimit(
    taskList,
    crawlerConcurrency,
    (v, cb1) => {
      bar.tick({ gtnm: v.name || v.github });
      getNum(v, cb1);
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
    callback => {
      if (finished.length > 0) {
        console.log(`retry ${unfinished.length} pkgs...`); // eslint-disable-line no-console
      }
      oneLoop(unfinished, (err, data) => {
        unfinished = data.filter(v => v.star === null);
        finished = finished.concat(data.filter(v => v.star !== null));
        callback(err, finished);
      });
    },
    cb0
  );
};

export default cb0 => {
  const qr = 'SELECT *, NULL as star FROM git WHERE `group` IS NOT NULL'; //  AND id < 100
  sqlExecOne(qr, (err0, db) => {
    if (err0) {
      cb0(err0);
    } else {
      collectStarNum(db, (err1, data) => {
        if (err1) {
          cb0(err1);
        } else {
          cb0(null, data);
        }
      });
    }
  });
};
