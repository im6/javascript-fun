const cheerio = require('cheerio');
const fetch = require('node-fetch');
const ProgressBar = require('progress');
const { githubUrl } = require('app-constant');
const mysqlObservable = require('mysql-observable');
const { from, forkJoin, Subject } = require('rxjs');
const { delay, switchMap, concatMap, toArray, tap } = require('rxjs/operators');

const timeout = 5 * 1000;
const crawlerStepDelay = 1000;
const { MY_COOKIE: Cookie } = process.env;

const category$ = new Subject();
mysqlObservable('SELECT * FROM category').subscribe(category$);

const getSiteData$ = () =>
  forkJoin([
    category$,
    mysqlObservable('SELECT * FROM site where grp is NOT NULL'),
  ]);

const getGithubStar$ = (obj) => {
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
    fetch(`${githubUrl}/${obj.github}`, httpOptions)
      .then((res) => res.text())
      .then((body) => cheerio.load(body))
      .then(($) => {
        let star = null;
        const name = obj.name || obj.github.split('/')[1];
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
        return {
          ...obj,
          name,
          star,
        };
      })
  );
};

const getGithubData$ = () => {
  let bar = null;
  return forkJoin([
    category$,
    mysqlObservable(
      'SELECT *, NULL as star FROM git WHERE `grp` IS NOT NULL' // " AND id < 20"
    ).pipe(
      tap((taskList) => {
        bar = new ProgressBar('downloading :current of :total: :gtnm', {
          total: taskList.length,
        });
      }),
      switchMap((x) =>
        from(x).pipe(
          concatMap((v) =>
            getGithubStar$(v).pipe(
              tap((pkg) => {
                bar.tick({ gtnm: pkg.name || pkg.github });
              }),
              delay(crawlerStepDelay)
            )
          ),
          toArray()
        )
      )
    ),
  ]);
};

module.exports = {
  getSiteData$,
  getGithubData$,
};
