"use strict";

const cheerio = require('cheerio'),
  async = require('async'),
  fs = require('fs'),
  rp = require('request-promise'),
  sqlConn = require('../../resource/mysqlConnection'),
  globalConfig = require('../../config/env'),

  CONCURRENCY = 10,
  TIMEOUT = 5 * 1000,
  JOBFLAG = '_JOBDONE';

let finished = null;
const privateFn = {
  checkNameExist: (v) => {
    if(v.name.length === 0){
      let gitList = v.github.split('/');
      v.name = gitList[1];
    }
  },

  promiseLoop: (data0, resolve, reject) => {
    console.log(`downloading ${data0.length} packages...`);
    async.mapLimit(data0, CONCURRENCY, (v, cb) => {
      privateFn.checkNameExist(v);
      privateFn.getNum(v, cb);
    }, (error, data) => {
      let unfinished = data.filter(v => !v[JOBFLAG]);
      finished = finished.concat(data.filter(v => v[JOBFLAG]));
      if(unfinished.length > 0){
        return privateFn.promiseLoop(unfinished, resolve, reject);
      }else{
        let result = finished.filter(v => v[JOBFLAG]);
        resolve(result);
      }
    });
  },

  getNum: (obj, cb)=> {
    //console.log('download ' + obj.name);
    rp({
      uri: 'https://github.com/' + obj.github,
      timeout: TIMEOUT,
      transform: function (body) {
        return cheerio.load(body);
      }
    })
      .then(function ($) {
        let elems = $('.social-count.js-social-count');
        let starElem = elems[0];
        let num = starElem.children[0].data.trim();
        obj['star'] = num;
        obj[JOBFLAG] = true;
        cb(null, obj);
      })
      .catch(function (err) {
        console.error('crawler timeout on ' + obj.name);
        cb(null, obj);
      });
  },
};

const publicFn = {
  start: () => {
    finished = [];
    const deferred = new Promise((resolve, reject) => {
      var qr = "SELECT * FROM git WHERE `group` IS NOT NULL";
      if(globalConfig.isDev){
        qr = "SELECT * FROM git WHERE `group` IS NOT NULL AND id > 419";
      }
      sqlConn.sqlExecOne(qr).then((db) => {
        privateFn.promiseLoop(db, resolve, reject)
      }, (err) => {
        console.error('sql executed fails1.');
      });
    });

    return deferred;
  }
};

module.exports = publicFn;
