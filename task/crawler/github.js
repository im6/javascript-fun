const async = require('async');
const cheerio = require('cheerio');
const numeral = require('numeral');
const rp = require('request-promise');

const sqlConn = require('../mysqlConnection');
const CONCURRENCY = 10;
const TIMEOUT = 5 * 1000;
const SHOWFULLNUM = true;

const privateFn = {
  collectStarNum: (db, resolve, reject) => {
    let unfinished = db,
      finished = [];
    async.whilst(
      cb => {
        cb(null, unfinished.length > 0);
      },
      callback => {
        if (finished.length > 0) {
          console.log(`retry ${unfinished.length} pkgs...`);
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
    console.log(`downloading ${taskList.length} packages...`);
    async.mapLimit(
      taskList,
      CONCURRENCY,
      (v, cb) => {
        privateFn.getNum(v, cb);
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

        if (obj.name.length === 0) {
          // empty string
          const gitList = obj.github.split('/');
          obj.name = gitList[1];
        }

        cb(null, obj);
      })
      .catch(() => {
        console.error(`crawler timeout on ${obj.name}`);
        cb(null, obj); // no err object, but collect failed items for next round.
      });
  },
};

module.exports = () => {
  const deferred = new Promise((resolve, reject) => {
    const qr = 'SELECT *, NULL as star FROM git WHERE `group` IS NOT NULL';
    sqlConn.sqlExecOne(qr).then(
      db => {
        privateFn.collectStarNum(db, resolve, reject);
      },
      err => {
        console.error('sql executed fails', err);
        reject(err);
      }
    );
  });

  return deferred;
};
