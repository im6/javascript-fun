import * as cheerio from 'cheerio';
import * as groupBy from 'lodash.groupby';
import * as orderBy from 'lodash.orderby';

export const groupSite = (data, grp) => {
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

export const groupGithub = (data, cateMap) => {
  const data1 = orderBy(data, ['star'], ['desc']);
  const data2 = groupBy(data1, 'category');
  const data3 = Object.keys(data2);
  const result = data3.map((k) => {
    const v = data2[k];
    const newItem = cateMap.get(parseInt(k, 10));
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

export const generateCateMap = (data) =>
  data.reduce((accumulator, currentValue) => {
    accumulator.set(currentValue.id, currentValue);
    return accumulator;
  }, new Map());

export const parseExtractGithub = (body) => {
  const $ = cheerio.load(body);
  const res = {
    star: -1,
    lastUpdate: '',
  };

  const starElems = $('span.Counter.js-social-count');
  if (starElems.length > 0) {
    const starElem = starElems[0];
    const numLabel = starElem.attribs['aria-label'];
    const numStr = numLabel.split(' ')[0];
    res.star = parseInt(numStr, 10);
  } else {
    // eslint-disable-next-line no-console
    console.error(`\n star number not found`);
  }

  const lastUpdateElems = $('relative-time');
  if (lastUpdateElems.length > 0) {
    const { datetime } = lastUpdateElems[0].attribs;
    res.lastUpdate = datetime;
  } else {
    // eslint-disable-next-line no-console
    console.error('\n last update not found');
  }
  return res;
};