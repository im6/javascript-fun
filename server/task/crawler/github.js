"use strict";

const cheerio = require('cheerio'),
  async = require('async'),
  fs = require('fs'),
  rp = require('request-promise'),
  sqlConn = require('../../resource/mysqlConnection'),
  globalConfig = require('../../config/env'),

  CONCURRENCY = 10,
  JOBFLAG = '_JOBDONE';

let finished = [];
const privateFn = {
  checkNameExist: (v) => {
    if(v.name.length === 0){
      let gitList = v.github.split('/');
      v.name = gitList[1];
    }
  },
  getUnfinished: (list) => {
    return list.filter(v => !v[JOBFLAG]);
  },

  promiseLoop: (data, resolve, reject) => {
    async.mapLimit(data, CONCURRENCY, (v, cb) => {
      privateFn.checkNameExist(v);
      privateFn.getNum(v, cb);
    }, (error, data) => {
      let unfinished = privateFn.getUnfinished(data);
      finished = finished.concat(data);
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
      timeout: 3 * 1000,
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
        console.error('Timeout on ' + obj.name);
        cb(null, obj);
      });
  },
};

const publicFn = {
  start: () => {
    const deferred = new Promise((resolve, reject) => {
      var qr = "SELECT * FROM git WHERE `group` IS NOT NULL";
      if(globalConfig.isDev){
        qr = "SELECT * FROM git WHERE `group` IS NOT NULL AND id < 20";
      }
      sqlConn.sqlExecOne(qr).then((db) => {
        privateFn.promiseLoop(db, resolve, reject)
      });
    });

    return deferred;
  }
};

module.exports = publicFn;
