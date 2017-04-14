"use strict";

let request = require('request'),
  cheerio = require('cheerio'),
  async = require('async'),
  fs = require('fs');

const CONCURRENCY = 4,
  JSONPATH = '../data/db.json',
  getNum = (obj, cb)=> {
  let url = obj.git;
  request({
    method: 'GET',
    uri: 'https://github.com'+url,

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
};


var db = null;
try {
  db = JSON.parse(fs.readFileSync(JSONPATH));
}

catch(err){
  console.error("JSON Error: " + err.message);
}


async.mapLimit(db.package, CONCURRENCY, (v, cb) => {
  console.log(`crawling ${v.name}...`);
  getNum(v, cb);
}, (error, data) => {
  if(error){
    console.error(error);
  }else{
    console.log(data);
  }
});
