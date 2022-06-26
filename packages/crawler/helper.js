const cheerio = require('cheerio');
const groupBy = require('lodash.groupby');
const orderBy = require('lodash.orderby');

const groupSite = (data, grp) => {
  const grpRef = grp.reduce((acc, cur) => {
    const grpJson = JSON.parse(JSON.stringify(cur));
    acc.set(cur.id, grpJson);
    return acc;
  }, new Map());
  const result = groupBy(data, 'category');
  const result2 = Object.keys(result).map((i) => {
    const obj = grpRef.get(parseInt(i, 10));
    obj.list = result[i];
    obj.anchorId = obj.name.replace(/\W+/g, '-');
    return obj;
  });
  return result2;
};

const groupGithub = (data, iconMap) => {
  const data1 = orderBy(data, ['star'], ['desc']);
  const data2 = groupBy(data1, 'category');
  const data3 = Object.keys(data2);
  const result = data3.map((k) => {
    const v = data2[k];
    const newItem = iconMap.get(parseInt(k, 10));
    newItem.list = v;
    newItem.anchorId = newItem.name.replace(/\W+/g, '-');
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

const convertGroupIcon = (data) =>
  data.reduce((accumulator, currentValue) => {
    accumulator.set(currentValue.id, currentValue);
    return accumulator;
  }, new Map());

const parseStarNum = (body) => {
  const $ = cheerio.load(body);
  const elems = $('span.Counter.js-social-count');
  if (elems.length === 0) {
    return null;
  }
  const starElem = elems[0];
  const numLabel = starElem.attribs['aria-label'];
  const numStr = numLabel.split(' ')[0];
  return parseInt(numStr, 10);
};

module.exports = {
  groupSite,
  groupGithub,
  convertGroupIcon,
  parseStarNum,
};
