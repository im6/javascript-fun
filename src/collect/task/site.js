import fs from 'fs';
import async from 'async';
import groupBy from 'lodash.groupby';
import sqlExecOne from '../mysqlConnection';

const group = (data, grp) => {
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
};

export default targetPath => {
  const querys = [
    'SELECT * FROM category_git',
    'SELECT * FROM site where grp is NOT NULL',
  ];
  async.map(querys, sqlExecOne, (err, d) => {
    if (err) {
      console.error(err); // eslint-disable-line no-console
      return;
    }
    const siteList = group(d[1], d[0]);
    fs.writeFileSync(targetPath, JSON.stringify(siteList));
    console.log('output site json success.'); // eslint-disable-line no-console
  });
};
