"use strict";
let fs = require('fs'),
  _ = require('lodash'),
  numeral = require('numeral'),
  jade = require('jade'),
  crawlerGit = require('../crawler/github'),
  sqlConn = require('../../resource/mysqlConnection'),
  shortid = require('shortid');

const HTMLINPUT = '../../../views/main/index.jade',
  HTMLOUTPUT = '../../../public/main/index.html',
  PROTOTYPEINPUT = './viewModel.json',
  PROTOTYPEOUTPUT = '../../../temp/viewModel.json';

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
      result['module'] = 'main';
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

  getGroupIcon: () => {
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
  convertGroupIcon: (data) => {
    let result = {};
    data.forEach(v => {
      result['k' + v.id] = v;
    });
    return result;
  },

  group: (data, iconMap) => {
    let result = [];
    let data1 =  _.orderBy(data, (v) => {
      return numeral(v.star).value();
    }, 'desc');
    let data2 = _.groupBy(data1, "group");

     _.each(data2, (v, k) => {
      result.push({
        name: iconMap['k' + k].name,
        icon: iconMap['k' + k].icon,
        list: v
      });
    });

    return result;
  },
};

const inst = {
  start: () => {
    let me = this;
    let p1 = privateFn.getGroupIcon();
    let p2 = crawlerGit.start();
    Promise.all([p1, p2]).then(d => {
      let iconMap = privateFn.convertGroupIcon(d[0]);
      let data = privateFn.group(d[1],iconMap);
      let proto = privateFn.getPrototype();
      proto.package = data;
      privateFn.exportViewModel(proto);
      privateFn.render(proto, HTMLINPUT, HTMLOUTPUT);

      process.exit();
    });
  },
  local: () => {
    var db = null;
    try {
      db = JSON.parse(fs.readFileSync(PROTOTYPEOUTPUT));
      db['version'] = shortid.generate();
      db['pretty'] = ISDEV;
      console.log(`version: ${db['version']}, isDEV: ${ISDEV}`);
      privateFn.render(db, HTMLINPUT, HTMLOUTPUT);
    }

    catch(err){
      console.error("JSON Error: " + err.message);
    }
  }
};


if(ISDEV){
  inst.local();
}else{
  inst.start();
}