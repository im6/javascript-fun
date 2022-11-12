import * as cheerio from 'cheerio';
import * as groupBy from 'lodash.groupby';
import * as orderBy from 'lodash.orderby';
import { GitParseResult, GitSchema } from './interface';
import { format, parseISO, differenceInMonths } from 'date-fns';

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

export const parseExtractGithub = (body: string): GitParseResult => {
  const $ = cheerio.load(body);

  let star = -1;
  let lastUpdate = '';

  const starElems = $('span.Counter.js-social-count');
  if (starElems.length > 0) {
    const starElem = starElems[0];
    const numLabel = starElem.attribs['aria-label'];
    const numStr = numLabel.split(' ')[0];
    star = parseInt(numStr, 10);
  }

  const lastUpdateElems = $('relative-time');
  if (lastUpdateElems.length > 0) {
    const { datetime } = lastUpdateElems[0].attribs;
    lastUpdate = datetime;
  }

  return {
    star,
    lastUpdate,
  };
};

export const mergeResult = (
  v: GitSchema,
  parseResult: GitParseResult
): GitSchema => {
  const { star, lastUpdate } = parseResult;
  const parsedDate = parseISO(lastUpdate);
  const diff = differenceInMonths(new Date(), parsedDate);
  /* istanbul ignore next */
  const inactiveDate = diff > 6 ? format(parsedDate, 'MMM d, yyyy') : '';
  return {
    ...v,
    star,
    inactiveDate,
    name: v.name || v.github.split('/')[1],
  };
};
