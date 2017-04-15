"use strict";

let request = require('request'),
  cheerio = require('cheerio'),
  async = require('async'),
  fs = require('fs'),
  sqlConn = require('../../resource/mysqlConnection');

const CONCURRENCY = 8;

const privateFn = {
  getNum: (obj, cb)=> {
    let url = obj.github;
    request({
      method: 'GET',
      uri: 'https://github.com/' + url,
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
    const deferred = new Promise((resolve, reject) => {
      var qr = "SELECT * FROM git WHERE `group` IS NOT NULL";
      sqlConn.sqlExecOne(qr).then((db) => {
        async.mapLimit(db, CONCURRENCY, (v, cb) => {
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
    });

    return deferred;
  }
};


module.exports = publicFn;
