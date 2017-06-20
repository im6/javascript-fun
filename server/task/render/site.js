"use strict";

const fs = require('fs'),
  _ = require('lodash'),
  path = require('path'),
  numeral = require('numeral'),
  moment = require('moment'),
  jade = require('jade'),
  sqlConn = require('../../resource/mysqlConnection'),
  globalConfig = require('../../config/env'),

  ISDEV = globalConfig.isDev,

  HTMLINPUT = path.join(__dirname, '../../../views/site/index.jade'),
  HTMLOUTPUT = path.join(__dirname, '../../../public/site/index.html'),
  PROTOTYPEINPUT = path.join(__dirname, './viewModel.json');


const privateFn = {
  getPrototype: () => {
    var result = null;
    try {
      result = JSON.parse(fs.readFileSync(PROTOTYPEINPUT));
      result['module'] = 'site';
      result['pretty'] = ISDEV;
    }

    catch(err){
      console.error("JSON Error: " + err.message);
    }

    return result;
  },

  render: (data, inputUrl, outputUrl)=> {
    try {
      var html = jade.renderFile(inputUrl, data);
      fs.openSync(outputUrl, 'w');
      fs.writeFileSync(outputUrl, html);
      console.log("================================");
      console.log(`render page ( ${data.page} ) success!`);
      console.log("================================");
    }
    catch(err){
      console.error("================================");
      console.error("Jade Build Error: " + err.message);
      console.error("================================");
    }
  },

  getGroup: () => {
    var qr = 'SELECT * FROM category_git';
    const deferred = new Promise((resolve, reject) => {
      sqlConn.sqlExecOne(qr).then((db) => {
        resolve(db);
      }, (res) => {
        reject(res);
      });
    });
    return deferred;
  },

  getSite:() => {
    var qr = 'SELECT * FROM site where grp is NOT NULL';
    const deferred = new Promise((resolve, reject) => {
      sqlConn.sqlExecOne(qr).then((db) => {
        resolve(db);
      }, (res) => {
        reject(res);
      });
    });
    return deferred;
  },

  group: (data, grp) => {
    let grpRef = {};
    grp.forEach(v => {
      grpRef['k' + v.id] = v;
    });

    let result = _.groupBy(data, "grp");
    let result2 = [];
    for(let i in result){
      if(result.hasOwnProperty(i)){
        let obj = grpRef['k' + i];
        obj['list'] = result[i];
        result2.push(obj);
      }
    }
    return result2;
  }
};

const inst = {
  start: () => {
    let me = this;

    let p1 = privateFn.getGroup();
    let p2 = privateFn.getSite();

    let vm = privateFn.getPrototype();

    Promise.all([p1, p2]).then(d => {
      if(ISDEV) {
        vm['bundleDir'] = '/build/site.js';
      } else {
        vm['bundleDir'] += 'site.js';
      }
      vm.list = privateFn.group(d[1], d[0]);
      vm.pretty = ISDEV;
      vm.page = 4;
      privateFn.render(vm, HTMLINPUT, HTMLOUTPUT);
    });
  }
};

module.exports = inst;