const cheerio = require('cheerio');
const fetch = require('node-fetch');
const mysqlObservable = require('mysql-observable');
const { from, forkJoin } = require('rxjs');
const { delay, switchMap, concatMap, toArray } = require('rxjs/operators');

const timeout = 5 * 1000;
const { MY_COOKIE: Cookie } = process.env;

const getGithubStarObservable = (obj) => {
  console.log('calling', obj.github);
  const httpOptions = {
    timeout,
    headers: {
      Cookie,
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
      Host: 'github.com',
    },
  };
  return from(
    fetch(`https://github.com/${obj.github}`, httpOptions)
      .then((res) => res.text())
      .then((body) => cheerio.load(body))
      .then(($) => {
        console.log('response on', obj.github);
        let star = null;
        const elems = $('a.social-count.js-social-count');
        if (elems.length === 0) {
          console.error(` ${githubUrl}/${obj.github} url not found.`); // eslint-disable-line no-console
          star = -1;
        } else {
          const starElem = elems[0];
          const numLabel = starElem.attribs['aria-label'];
          const numStr = numLabel.split(' ')[0];
          star = parseInt(numStr, 10);
        }
        if (!obj.name) {
          [, obj.name] = obj.github.split('/');
        }
        return {
          ...obj,
          star,
        };
      })
  );
};

const getSiteDataObservable = () =>
  forkJoin([
    mysqlObservable('SELECT * FROM category'),
    mysqlObservable('SELECT * FROM site where grp is NOT NULL'),
  ]);

const getGithubDataObservable = () =>
  forkJoin([
    mysqlObservable('SELECT * FROM category'),
    mysqlObservable(
      'SELECT *, NULL as star FROM git WHERE `grp` IS NOT NULL AND id < 20' // " AND id < 20"
    ).pipe(
      switchMap((x) =>
        from(x).pipe(
          concatMap((v) => getGithubStarObservable(v).pipe(delay(800))),
          toArray()
        )
      )
    ),
  ]);

module.exports = {
  getSiteDataObservable,
  getGithubDataObservable,
};
