"use strict";
let fs = require('fs'),
  _ = require('lodash'),
  numeral = require('numeral'),
  moment = require('moment'),
  jade = require('jade'),
  sqlConn = require('../../resource/mysqlConnection'),
  shortid = require('shortid');

const HTMLINPUT = '../../../views/site/index.jade',
  HTMLOUTPUT = '../../../public/site/index.html',
  PROTOTYPEINPUT = './viewModel_site.json',
  PROTOTYPEOUTPUT = '../../../temp/viewModel_site.json';

const ISDEV = process.argv.length == 3;

const privateFn = {
  exportViewModel:(data)=> {
    fs.openSync(PROTOTYPEOUTPUT, 'w');
    fs.writeFileSync(PROTOTYPEOUTPUT, JSON.stringify(data));
  },

  getPrototype: () => {
    var result = null;
    try {
      result = JSON.parse(fs.readFileSync(PROTOTYPEINPUT));
      result['module'] = 'site';
      result['pretty'] = ISDEV;
      result['version'] = shortid.generate();
      console.log(`version: ${result['version']}, isDEV: ${ISDEV}`);
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
      console.log("render success!");
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
    var qr = 'SELECT * FROM site';
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
    Promise.all([p1, p2]).then(d => {
      let vm = privateFn.getPrototype();
      vm.list = privateFn.group(d[1], d[0]);
      vm.pretty = ISDEV;
      privateFn.exportViewModel(vm);
      privateFn.render(vm, HTMLINPUT, HTMLOUTPUT);
      process.exit();
    });
  },
  local: () => {
    var db = null;
    try {
      db = JSON.parse(fs.readFileSync(PROTOTYPEOUTPUT));
      db['version'] = shortid.generate();
      db['pretty'] = ISDEV;
      db.page = 4;
      console.log(`version: ${db['version']}, isDEV: ${ISDEV}`);
      privateFn.render(db, HTMLINPUT, HTMLOUTPUT);
    }

    catch(err){
      console.error("JSON Error: " + err.message);
    }
  }
};


//if(ISDEV){
//  inst.local();
//}else{
//  inst.start();
//}

inst.start();