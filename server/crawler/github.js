"use strict";

let request = require('request'),
  cheerio = require('cheerio'),
  async = require('async'),
  fs = require('fs');

const CONCURRENCY = 4,
  JSONPATH = '../data/db.json';

const privateFn = {
  getNum: (obj, cb)=> {
    let url = obj.git;
    request({
      method: 'GET',
      uri: 'https://github.com' + url,
    }, function(err, res, body){
      if(err){
        console.error(err);
        cb(true, err);
      }else{
        try{
          let $ = cheerio.load(body);
          let elems = $('.social-count.js-social-count');
          let starElem = elems[0];
          let num = starElem.children[0].data.trim();
          obj['star'] = num;
          cb(null, obj);
        } catch (ex){
          console.error(ex);
          cb(true, ex);
        }
      }
    });
  },

  getJson:(path) => {
    var db = null;
    try {
      db = JSON.parse(fs.readFileSync(path));
    }

    catch(err){
      console.error("JSON Error: " + err.message);
    }

    return db;
  },
};

const publicFn = {
  start: () => {
    let db = privateFn.getJson(JSONPATH);
    const deferred = new Promise((resolve, reject) => {
      async.mapLimit(db.package, CONCURRENCY, (v, cb) => {
        console.log(`crawling ${v.name}...`);
        privateFn.getNum(v, cb);
      }, (error, data) => {
        if(error){
          console.error(error);
          reject(error);
        }else{
          resolve(data);
        }
      });
    });

    return deferred;
  }
};







module.exports = publicFn;
