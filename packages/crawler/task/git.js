const async = require("async");
const groupBy = require("lodash.groupby");
const orderBy = require("lodash.orderby");
const sqlExecOne = require("mysql-client");

const getPackageList = require("./crawler");

const convertGroupIcon = (data) =>
  data.reduce((accumulator, currentValue) => {
    accumulator[`k${currentValue.id}`] = currentValue;
    return accumulator;
  }, {});

const group = (data, iconMap) => {
  const data1 = orderBy(data, ["star"], ["desc"]);
  const data2 = groupBy(data1, "grp");
  const data3 = Object.keys(data2);
  const result = data3.map((k) => {
    const v = data2[k];
    const newItem = iconMap[`k${k}`];
    newItem.list = v;
    newItem.anchorId = newItem.name.replace(/\W+/g, "-");
    if (newItem.icon) {
      newItem.list.forEach((v1, k1) => {
        if (!v1.img) {
          newItem.list[k1].img = newItem.icon;
        }
      });
    }
    return newItem;
  });
  return orderBy(result, ["page", "sort"]);
};

module.exports = (cb0) => {
  async.parallel(
    [
      (cb) => {
        sqlExecOne("SELECT * FROM category", cb);
      },
      (cb) => {
        getPackageList(
          "SELECT *, NULL as star FROM git WHERE `grp` IS NOT NULL AND id < 20", // " AND id < 20"
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
