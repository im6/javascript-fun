"use strict";
const fs = require('fs'),
  groupBy = require('lodash.groupby'),
  orderBy = require('lodash.orderby'),
  path = require('path'),
  numeral = require('numeral'),
  moment = require('moment'),
  pug = require('pug'),
  crawlerGit = require('../crawler/github'),
  sqlConn = require('../../resource/mysqlConnection'),
  PROTOTYPEINPUT = path.join(__dirname, './viewModel.json'),
  ISDEV = process.env.NODE_ENV === 'development',
  PAGECONFIG = [
    {
      page: 1,
      input: path.join(__dirname, '../../../views/main/index.pug'),
      output: path.join(__dirname, '../../../public/index.html')
    },
    {
      page: 2,
      input: path.join(__dirname, '../../../views/main/index.pug'),
      output: path.join(__dirname, '../../../public/node/index.html')
    },
    {
      page: 3,
      input: path.join(__dirname, '../../../views/main/index.pug'),
      output: path.join(__dirname, '../../../public/library/index.html')
    }
  ];

const privateFn = {
  getPrototype: () => {
    let result = null;
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
      const html = pug.renderFile(inputUrl, data);
      fs.openSync(outputUrl, 'w');
      fs.writeFileSync(outputUrl, html);
      console.log("================================");
      console.log(`render page ( ${data.page} ) success!`);
      console.log("================================");
    }
    catch(err){
      console.error("================================");
      console.error("Pug Build Error: " + err.message);
      console.error("================================");
    }
  },

  getGroupIcon: () => {
    const qr = 'SELECT * FROM category_git';
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
    const data1 =  orderBy(data, (v) => {
      return numeral(v.star).value();
    }, 'desc');

    const data2 = groupBy(data1, "group");
    const data3 = Object.keys(data2);
    const result = data3.map((k) => {
      const v = data2[k];
      const newItem = iconMap['k' + k];
      newItem['list'] = v;
      if(newItem.icon) {
        newItem['list'].forEach(v => {
          if(!v.img){
            v.img = newItem.icon;
          }
        });
      }
      return newItem;
    });
    return orderBy(result, ['page', 'sort']);
  },

  confirmDirExist: () => {
    const dirs = ['node', 'library', 'site', 'article'];
    dirs.forEach(function(v){
      const oneD = path.join(__dirname, '../../../public/' + v);
      if (!fs.existsSync(oneD)){
        fs.mkdirSync(oneD);
      }
    });
  }
};

const inst = {
  start: (done) => {
    let p1 = privateFn.getGroupIcon();
    privateFn.confirmDirExist();
    let p2 = crawlerGit.start();

    Promise.all([p1, p2]).then(d => {
      let iconMap = privateFn.convertGroupIcon(d[0]);
      let data = privateFn.group(d[1],iconMap);

      let vm = privateFn.getPrototype();
      const bundleUrl = vm.bundleDir;

      PAGECONFIG.forEach(v => {
        vm.list = data.filter(v1 => v1.page === v.page);
        vm.page = v.page;
        vm['pretty'] = ISDEV;
        if(ISDEV) {
          vm.bundleDir = '/build/main.js';
        } else {
          vm.bundleDir = bundleUrl + 'main.js';
        }

        vm['lastUpdate'] = moment().format('LLL');
        privateFn.render(vm, v.input, v.output);
      });
      console.log('Finished rendering main icon pages.');
      done();
    }, err => {
      console.error(err);
    });
  },
};

module.exports = inst;