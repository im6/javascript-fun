const fetch = require('node-fetch');
const ProgressBar = require('progress');
const { githubUrl } = require('app-constant');
const mysqlObservable = require('mysql-observable');
const { from, forkJoin, Subject } = require('rxjs');
const {
  tap,
  map,
  delay,
  toArray,
  switchMap,
  concatMap,
} = require('rxjs/operators');

const { parseStarNum } = require('./helper');

const timeout = 5 * 1000;
const crawlerStepDelay = 800;
const { MY_COOKIE: Cookie } = process.env;

const category$ = new Subject();
mysqlObservable('SELECT * FROM category').subscribe(category$);

const getSiteData$ = () =>
  forkJoin([
    category$,
    mysqlObservable('SELECT * FROM site where grp is NOT NULL'),
  ]);

const getGithubStar$ = (subUrl) => {
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
    fetch(`${githubUrl}/${subUrl}`, httpOptions)
      .then((res) => res.text())
      .then((body) => parseStarNum(body))
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
      switchMap((x) => from(x)),
      concatMap((v) =>
        getGithubStar$(v.github).pipe(
          map((star) => ({
            ...v,
            star,
            name: v.name || v.github.split('/')[1],
          })),
          tap(({ github, star }) => {
            bar.tick({ gtnm: github });
            if (!star) {
              // eslint-disable-next-line no-console
              console.error(`\n star number not found: ${githubUrl}/${github}`);
            }
          }),
          delay(crawlerStepDelay)
        )
      ),
      toArray()
    ),
  ]);
};

module.exports = {
  getSiteData$,
  getGithubData$,
};
