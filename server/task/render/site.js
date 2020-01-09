const fs = require('fs');
const pug = require('pug');
const path = require('path');
const groupBy = require('lodash.groupby');

const sqlConn = require('../mysqlConnection');
const HTMLINPUT = path.join(__dirname, '../../../views/site/index.pug');
const HTMLOUTPUT = path.join(__dirname, '../../../public/site/index.html');
const vm0 = require('../../config');
const ISDEV = process.env.NODE_ENV === 'development';

const privateFn = {
  getPrototype: () => {
    return Object.assign({}, vm0);
  },

  render: (data, inputUrl, outputUrl) => {
    const html = pug.renderFile(inputUrl, data);
    fs.openSync(outputUrl, 'w');
    fs.writeFileSync(outputUrl, html);
    console.log(`render page ( ${data.page} ) success!`);
  },

  getGroup: () => {
    const qr = 'SELECT * FROM category_git';
    const deferred = new Promise((resolve, reject) => {
      sqlConn.sqlExecOne(qr).then(
        db => {
          resolve(db);
        },
        res => {
          reject(res);
        }
      );
    });
    return deferred;
  },

  getSite: () => {
    const qr = 'SELECT * FROM site where grp is NOT NULL';
    const deferred = new Promise((resolve, reject) => {
      sqlConn.sqlExecOne(qr).then(
        db => {
          resolve(db);
        },
        res => {
          reject(res);
        }
      );
    });
    return deferred;
  },

  group: (data, grp) => {
    const grpRef = grp.reduce((acc, cur) => {
      acc['k' + cur.id] = cur;
      return acc;
    }, {});
    const result = groupBy(data, 'grp');
    const result2 = [];
    for (let i in result) {
      if (result.hasOwnProperty(i)) {
        const obj = grpRef['k' + i];
        obj.list = result[i];
        result2.push(obj);
      }
    }
    return result2;
  },
};

module.exports = () => {
  const p0 = privateFn.getGroup();
  const p1 = privateFn.getSite();
  const vm = privateFn.getPrototype();
  vm.bundleDir = ISDEV ? '/build/site.js' : `${vm.bundleDir}site.js`; // object mutate

  Promise.all([p0, p1]).then(d => {
    vm.list = privateFn.group(d[1], d[0]);
    vm.pretty = ISDEV;
    vm.module = 'site';
    vm.page = 4;
    privateFn.render(vm, HTMLINPUT, HTMLOUTPUT);
  });
};
