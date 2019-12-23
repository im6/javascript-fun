const async = require('async');
const cheerio = require('cheerio');
const numeral = require('numeral');
const rp = require('request-promise');

const sqlConn = require('../../resource/mysqlConnection');
const CONCURRENCY = 10;
const TIMEOUT = 5 * 1000;
const JOBFLAG = '_JOBDONE';
const showInteger = true;

let finished = []; // must be global for recursive purpose

const privateFn = {
  promiseLoop: (data0, resolve, reject) => {
    console.log(`downloading ${data0.length} packages...`);
    async.mapLimit(
      data0,
      CONCURRENCY,
      (v, cb) => {
        if (v.name.length === 0) {
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
        const unfinished = data.filter(v => !v[JOBFLAG]);
        finished = finished.concat(data.filter(v => v[JOBFLAG]));
        if (unfinished.length > 0) {
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
        if (showInteger) {
          const numLabel = starElem.attribs['aria-label'];
          const numStr = numLabel.split(' ')[0];
          const num = numeral(numStr).format('0,0');
          obj.star = num;
        } else {
          const num = starElem.children[0].data.trim();
          obj.star = num;
        }
        obj[JOBFLAG] = true;
        cb(null, obj);
        return obj;
      })
      .catch(() => {
        console.error(`crawler timeout on ${obj.name}`);
        cb(null, obj);
      });
  },
};

module.exports = () => {
  finished = [];
  const deferred = new Promise((resolve, reject) => {
    const qr = `SELECT * FROM git WHERE \`group\` IS NOT NULL ${
      process.env.NODE_ENV === 'development' ? 'AND id > 500' : ''
    }`;
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
