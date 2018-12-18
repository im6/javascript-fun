const cheerio = require('cheerio');
const async = require('async');
const rp = require('request-promise');
const sqlConn = require('../../resource/mysqlConnection');
const globalConfig = require('../../config/env');

const CONCURRENCY = 10;
const TIMEOUT = 5 * 1000;
const JOBFLAG = '_JOBDONE';

let finished = null;
const privateFn = {
  promiseLoop: (data0, resolve, reject) => {
    console.log(`downloading ${data0.length} packages...`);
    async.mapLimit(data0, CONCURRENCY, (v, cb) => {
      if (v.name.length === 0) {
        const gitList = v.github.split('/');
        v.name = gitList[1];
      }
      privateFn.getNum(v, cb);
    }, (error, data) => {
      const unfinished = data.filter(v => !v[JOBFLAG]);
      finished = finished.concat(data.filter(v => v[JOBFLAG]));
      if (unfinished.length > 0) {
        return privateFn.promiseLoop(unfinished, resolve, reject);
      }
      const result = finished.filter(v => v[JOBFLAG]);
      resolve(result);
      return 0;
    });
  },

  getNum: (obj0, cb) => {
    const obj = Object.assign({}, obj0);
    rp({
      uri: `https://github.com/${obj.github}`,
      timeout: TIMEOUT,
      transform: body => cheerio.load(body),
    })
      .then(($) => {
        const elems = $('.social-count.js-social-count');
        const starElem = elems[0];
        const num = starElem.children[0].data.trim();
        obj.star = num;
        obj[JOBFLAG] = true;
        cb(null, obj);
      })
      .catch(() => {
        console.error(`crawler timeout on ${obj.name}`);
        cb(null, obj);
      });
  },
};

const publicFn = {
  start: () => {
    finished = [];
    const deferred = new Promise((resolve, reject) => {
      let qr = 'SELECT * FROM git WHERE `group` IS NOT NULL';
      if (globalConfig.isDev) {
        qr = 'SELECT * FROM git WHERE `group` IS NOT NULL AND id > 419';
      }
      sqlConn.sqlExecOne(qr).then((db) => {
        privateFn.promiseLoop(db, resolve, reject);
      }, () => {
        console.error('sql executed fails1.');
      });
    });

    return deferred;
  },
};

module.exports = publicFn;
