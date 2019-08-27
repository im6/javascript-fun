const fs = require('fs'),
  pug = require('pug'),
  path = require('path'),
  moment = require('moment'),
  numeral = require('numeral'),
  groupBy = require('lodash.groupby'),
  orderBy = require('lodash.orderby'),
  getPackageList = require('../crawler/github'),
  sqlConn = require('../../resource/mysqlConnection'),
  ISDEV = process.env.NODE_ENV === 'development',
  PAGECONFIG = [
    {
      page: 1,
      input: path.join(__dirname, '../../../views/main/index.pug'),
      output: path.join(__dirname, '../../../public/index.html'),
    },
    {
      page: 2,
      input: path.join(__dirname, '../../../views/main/index.pug'),
      output: path.join(__dirname, '../../../public/node/index.html'),
    },
    {
      page: 3,
      input: path.join(__dirname, '../../../views/main/index.pug'),
      output: path.join(__dirname, '../../../public/library/index.html'),
    },
  ];

const privateFn = {
  getPrototype: () =>
    JSON.parse(fs.readFileSync(path.join(__dirname, './viewModel.json'))),
  render: (data, inputUrl, outputUrl) => {
    const html = pug.renderFile(inputUrl, data);
    fs.openSync(outputUrl, 'w');
    fs.writeFileSync(outputUrl, html);
    console.log(`render page ( ${data.page} ) success!`);
  },

  getGroupIcon: () => {
    const qr = 'SELECT * FROM category_git';
    return new Promise((resolve, reject) => {
      sqlConn.sqlExecOne(qr).then(
        db => {
          resolve(db);
        },
        res => {
          reject(res);
        }
      );
    });
  },

  convertGroupIcon: data => {
    return data.reduce((accumulator, currentValue) => {
      if (currentValue.icon.length === 0) {
        currentValue.icon = null;
      }
      accumulator['k' + currentValue.id] = currentValue;
      return accumulator;
    }, {});
  },

  group: (data, iconMap) => {
    const data1 = orderBy(data, v => numeral(v.star).value(), 'desc');
    const data2 = groupBy(data1, 'group');
    const data3 = Object.keys(data2);
    const result = data3.map(k => {
      const v = data2[k];
      const newItem = iconMap['k' + k];
      newItem.list = v;
      if (newItem.icon) {
        newItem.list.forEach(v => {
          if (!v.img) {
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
    dirs.forEach(v => {
      const oneD = path.join(__dirname, '../../../public/' + v);
      if (!fs.existsSync(oneD)) {
        fs.mkdirSync(oneD);
      }
    });
  },
};

module.exports = done => {
  privateFn.confirmDirExist();
  const p0 = privateFn.getGroupIcon();
  const p1 = getPackageList();

  Promise.all([p0, p1]).then(
    d => {
      const iconMap = privateFn.convertGroupIcon(d[0]);
      const data = privateFn.group(d[1], iconMap);
      const vm = privateFn.getPrototype();
      vm.bundleDir = ISDEV ? '/build/main.js' : `${vm.bundleDir}main.js`; // object mutating

      PAGECONFIG.forEach(v => {
        vm.list = data.filter(v1 => v1.page === v.page);
        vm.page = v.page;
        vm.pretty = ISDEV;
        vm.lastUpdate = moment().format('LLL');
        privateFn.render(vm, v.input, v.output);
      });
      console.log('Finished rendering main icon pages.');
      done();
    },
    err => {
      console.error(err);
    }
  );
};
