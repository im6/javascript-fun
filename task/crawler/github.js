const async = require('async');
const cheerio = require('cheerio');
const numeral = require('numeral');
const rp = require('request-promise');

const sqlConn = require('../mysqlConnection');
const CONCURRENCY = 10;
const TIMEOUT = 5 * 1000;
const SHOWFULLNUM = true;

let finished = []; // must be global for recursive purpose

const privateFn = {
  promiseLoop: (taskList, resolve, reject) => {
    console.log(`downloading ${taskList.length} packages...`);
    async.mapLimit(
      taskList,
      CONCURRENCY,
      (v, cb) => {
        if (v.name.length === 0) {
          // empty string
          const gitList = v.github.split('/');
          v.name = gitList[1];
        }
        privateFn.getNum(v, cb);
      },
      (error, data) => {
        if (error) {
          reject(error);
          return;
        }
        const unfinished = data.filter(v => v.star === null);
        finished = finished.concat(data.filter(v => v.star !== null));
        if (unfinished.length > 0) {
          console.log(`retry ${unfinished.length} pkgs...`);
          return privateFn.promiseLoop(unfinished, resolve, reject);
        } else {
          resolve(finished);
          return 0;
        }
      }
    );
  },

  getNum: (obj0, cb) => {
    const obj = Object.assign({}, obj0);
    rp({
      uri: `https://github.com/${obj.github}`,
      timeout: TIMEOUT,
      transform: body => cheerio.load(body),
    })
      .then($ => {
        const elems = $('a.social-count.js-social-count');
        const starElem = elems[0];
        if (SHOWFULLNUM) {
          const numLabel = starElem.attribs['aria-label'];
          const numStr = numLabel.split(' ')[0];
          const num = numeral(numStr).format('0,0');
          obj.star = num;
        } else {
          const num = starElem.children[0].data.trim();
          obj.star = num;
        }
        cb(null, obj);
        return obj;
      })
      .catch(() => {
        console.error(`crawler timeout on ${obj.name}`);
        cb(null, obj); // no err object, but collect failed items for next round.
      });
  },
};

module.exports = () => {
  finished = [];
  const deferred = new Promise((resolve, reject) => {
    const qr = 'SELECT *, NULL as star FROM git WHERE `group` IS NOT NULL';
    sqlConn.sqlExecOne(qr).then(
      db => {
        privateFn.promiseLoop(db, resolve, reject);
      },
      err => {
        console.error('sql executed fails', err);
      }
    );
  });

  return deferred;
};
