const fs = require('fs'),
  numeral = require('numeral'),
  groupBy = require('lodash.groupby'),
  orderBy = require('lodash.orderby'),
  getPackageList = require('../crawler/github'),
  sqlConn = require('../mysqlConnection');

const privateFn = {
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
};

module.exports = (targetPath, done) => {
  const p0 = privateFn.getGroupIcon();
  const p1 = getPackageList();

  Promise.all([p0, p1]).then(
    d => {
      const iconMap = privateFn.convertGroupIcon(d[0]);
      const data = privateFn.group(d[1], iconMap);
      fs.writeFileSync(targetPath, JSON.stringify(data));
      console.log('output github json file');
      done();
    },
    err => {
      console.error(err);
    }
  );
};
