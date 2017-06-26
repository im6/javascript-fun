"use strict";
const fs = require('fs'),
  _ = require('lodash'),
  path = require('path'),
  numeral = require('numeral'),
  moment = require('moment'),
  jade = require('jade'),
  crawlerGit = require('../crawler/github'),
  sqlConn = require('../../resource/mysqlConnection'),
  globalConfig = require('../../config/env'),

  PROTOTYPEINPUT = path.join(__dirname, './viewModel.json'),
  ISDEV = globalConfig.isDev,
  PAGECONFIG = [
    {
      page: 1,
      input: path.join(__dirname, '../../../views/main/index.jade'),
      output: path.join(__dirname, '../../../public/main/index.html')
    },
    {
      page: 2,
      input: path.join(__dirname, '../../../views/main/index.jade'),
      output: path.join(__dirname, '../../../public/main/node.html')
    },
    {
      page: 3,
      input: path.join(__dirname, '../../../views/main/index.jade'),
      output: path.join(__dirname, '../../../public/main/library.html')
    }
  ];

const privateFn = {
  getPrototype: () => {
    var result = null;
    try {
      result = JSON.parse(fs.readFileSync(PROTOTYPEINPUT));
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
      if(v.icon.length == 0){
        v.icon=null;
      }
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
       let newItem = iconMap['k' + k];
       newItem['list'] = v;
       if(newItem.icon){
         newItem['list'].forEach(v => {
           v.img = newItem.icon;
         });
       }
      result.push(newItem);
    });

    result = _.orderBy(result, ['page', 'sort']);
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

      let vm = privateFn.getPrototype();
      const bundleUrl = vm['bundleDir'];

      PAGECONFIG.forEach(v => {
        vm.list = data.filter(v1 => v1.page === v.page);
        vm.page = v.page;
        vm['pretty'] = ISDEV;
        if(ISDEV) {
          vm['bundleDir'] = '/build/main.js';
        } else {
          vm['bundleDir'] = bundleUrl + 'main.js';
        }

        vm['lastUpdate'] = moment().format('LLL');
        privateFn.render(vm, v.input, v.output);
      });
    }, err => {
      console.error(err);
    });
  },
};

module.exports = inst;