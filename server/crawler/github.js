
"use strict";
let request = require('request'),
  cheerio = require('cheerio'),
  async = require('async'),
  fs = require('fs');

let getGitStar = (url) => {
  let deferred = new Promise((resolve, reject) => {
    request({
      method: 'GET',
      uri: 'https://github.com'+url,

    }, function(err, res, body){
      if(err){
        console.error(err);
        reject(err);
      }else{
        try{
          let $ = cheerio.load(body);
          let elems = $('.social-count.js-social-count');
          let starElem = elems[0];
          let num = starElem.children[0].data.trim();
          resolve(num);
        } catch (ex){
          reject(err);
        }
      }
    });
  });

  return deferred;
};

//getGitStar('facebook/react').then((res)=> {
//  debugger;
//});




var configJson = null;
try {
  configJson = JSON.parse(fs.readFileSync('../config.json'));
}

catch(err){
  console.error("JSON Error: " + err.message);
}

let newLink = [];
configJson.link.forEach((v1, k1)=>{
  let promiseList = [];
  v1.list.forEach(v => {
    promiseList.push(getGitStar(v.git));
  });
  Promise.all(promiseList).then(values => {
    values.forEach((v3, k3) => {
      v1.list[k3].star = v3;
    });
  });
});


