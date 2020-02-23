const fs = require('fs');
const groupBy = require('lodash.groupby');
const sqlConn = require('../mysqlConnection');

const privateFn = {
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

module.exports = targetPath => {
  const p0 = privateFn.getGroup();
  const p1 = privateFn.getSite();
  Promise.all([p0, p1]).then(d => {
    const siteList = privateFn.group(d[1], d[0]);
    fs.writeFileSync(targetPath, JSON.stringify(siteList));
    console.log('output site json success.');
  });
};
