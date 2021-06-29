const async = require('async');
const groupBy = require('lodash.groupby');
const sqlExecOne = require('mysql-client');

const group = (data, grp) => {
  const grpRef = grp.reduce((acc, cur) => {
    acc[`k${cur.id}`] = cur;
    return acc;
  }, {});
  const result = groupBy(data, 'grp');
  const result2 = Object.keys(result).map((i) => {
    const obj = grpRef[`k${i}`];
    obj.list = result[i];
    obj.anchorId = obj.name.replace(/\W+/g, '-');
    return obj;
  });
  return result2;
};

module.exports = (cb) => {
  const querys = [
    'SELECT * FROM category',
    'SELECT * FROM site where grp is NOT NULL',
  ];
  async.map(querys, sqlExecOne, (err, [grps, sites]) => {
    if (err) {
      cb(err);
    } else {
      const siteList = group(sites, grps);
      cb(null, siteList);
    }
  });
};
