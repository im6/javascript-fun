"use strict";

const fs = require('fs'),
  groupBy = require('lodash.groupby'),
  path = require('path'),
  pug = require('pug'),
  sqlConn = require('../../resource/mysqlConnection'),
  ISDEV = process.env.NODE_ENV === 'development',
  HTMLINPUT = path.join(__dirname, '../../../views/site/index.pug'),
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
      var html = pug.renderFile(inputUrl, data);
      fs.openSync(outputUrl, 'w');
      fs.writeFileSync(outputUrl, html);
      console.log("================================");
      console.log(`render page ( ${data.page} ) success!`);
      console.log("================================");
    }
    catch(err){
      console.error("================================");
      console.error("pug Build Error: " + err.message);
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

    let result = groupBy(data, "grp");
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
    const bundleUrl = vm['bundleDir'];

    Promise.all([p1, p2]).then(d => {
      if(ISDEV) {
        vm['bundleDir'] = '/build/site.js';
      } else {
        vm['bundleDir'] = bundleUrl + 'site.js';
      }
      vm.list = privateFn.group(d[1], d[0]);
      vm.pretty = ISDEV;
      vm.page = 4;
      privateFn.render(vm, HTMLINPUT, HTMLOUTPUT);
    });
  }
};

module.exports = inst;