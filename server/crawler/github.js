
"use strict";
let request = require('request'),
  cheerio = require('cheerio');

let getGitStar = (url) => {
  let deferred = new Promise((resolve, reject) => {
    request({
      method: 'GET',
      uri: 'https://github.com/'+url,

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

getGitStar('facebook/react').then((res)=> {
  debugger;
});
