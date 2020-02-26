import fs from 'fs';
import numeral from 'numeral';
import groupBy from 'lodash.groupby';
import orderBy from 'lodash.orderby';
import getPackageList from './crawler';
import sqlExecOne from '../mysqlConnection';

const privateFn = {
  getGroupIcon: () => {
    const qr = 'SELECT * FROM category_git';
    return new Promise((resolve, reject) => {
      sqlExecOne(qr).then(
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
      accumulator[`k${currentValue.id}`] = currentValue;
      if (currentValue.icon.length === 0) {
        accumulator[`k${currentValue.id}`].icon = null;
      }
      return accumulator;
    }, {});
  },

  group: (data, iconMap) => {
    const data1 = orderBy(data, v => numeral(v.star).value(), 'desc');
    const data2 = groupBy(data1, 'group');
    const data3 = Object.keys(data2);
    const result = data3.map(k => {
      const v = data2[k];
      const newItem = iconMap[`k${k}`];
      newItem.list = v;
      if (newItem.icon) {
        newItem.list.forEach((v1, k1) => {
          if (!v1.img) {
            newItem.list[k1].img = newItem.icon;
          }
        });
      }
      return newItem;
    });
    return orderBy(result, ['page', 'sort']);
  },
};

export default (targetPath, done) => {
  const p0 = privateFn.getGroupIcon();
  const p1 = getPackageList();

  Promise.all([p0, p1]).then(
    d => {
      const iconMap = privateFn.convertGroupIcon(d[0]);
      const data = privateFn.group(d[1], iconMap);
      fs.writeFileSync(targetPath, JSON.stringify(data));
      console.log('output github json file'); // eslint-disable-line no-console
      done();
    },
    err => {
      console.error(err); // eslint-disable-line no-console
    }
  );
};
