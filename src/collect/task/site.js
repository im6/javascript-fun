import fs from 'fs';
import groupBy from 'lodash.groupby';
import sqlExecOne from '../mysqlConnection';

const privateFn = {
  getGroup: () => {
    const qr = 'SELECT * FROM category_git';
    const deferred = new Promise((resolve, reject) => {
      sqlExecOne(qr).then(
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
      sqlExecOne(qr).then(
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
      acc[`k${cur.id}`] = cur;
      return acc;
    }, {});
    const result = groupBy(data, 'grp');
    const result2 = Object.keys(result).map(i => {
      const obj = grpRef[`k${i}`];
      obj.list = result[i];
      return obj;
    });
    return result2;
  },
};

export default targetPath => {
  const p0 = privateFn.getGroup();
  const p1 = privateFn.getSite();
  Promise.all([p0, p1]).then(d => {
    const siteList = privateFn.group(d[1], d[0]);
    fs.writeFileSync(targetPath, JSON.stringify(siteList));
    console.log('output site json success.'); // eslint-disable-line no-console
  });
};
