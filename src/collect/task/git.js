import async from 'async';
import numeral from 'numeral';
import groupBy from 'lodash.groupby';
import orderBy from 'lodash.orderby';
import getPackageList from './crawler';
import sqlExecOne from '../mysqlConnection';

const convertGroupIcon = data => {
  return data.reduce((accumulator, currentValue) => {
    accumulator[`k${currentValue.id}`] = currentValue;
    if (currentValue.icon.length === 0) {
      accumulator[`k${currentValue.id}`].icon = null;
    }
    return accumulator;
  }, {});
};

const group = (data, iconMap) => {
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
};

export default cb0 => {
  async.parallel(
    [
      cb => {
        sqlExecOne('SELECT * FROM category_git', cb);
      },
      cb => {
        getPackageList(
          'SELECT *, NULL as star FROM git WHERE `group` IS NOT NULL', // [ AND id < 20]
          cb
        );
      },
    ],
    (err, [d0, d1]) => {
      if (err) {
        cb0(err);
      } else {
        const iconMap = convertGroupIcon(d0);
        const data = group(d1, iconMap);
        cb0(null, data);
      }
    }
  );
};
