const AWS = require('aws-sdk');
const fetch = require('node-fetch');
const ProgressBar = require('progress');
const { githubUrl } = require('app-constant');
const { from, forkJoin, Observable, Subject } = require('rxjs');
const {
  tap,
  map,
  delay,
  toArray,
  switchMap,
  concatMap,
} = require('rxjs/operators');
const { parseStarNum } = require('./helper');

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const timeout = 5 * 1000;
const crawlerStepDelay = 800;
const { MY_COOKIE: Cookie } = process.env;

const getDynamoScan$ = (params) =>
  new Observable((subscriber) => {
    dynamodb.scan(params, (err, raw) => {
      if (err) {
        subscriber.error(err);
        return;
      }
      const data = raw.Items.map((v) => AWS.DynamoDB.Converter.unmarshall(v));
      subscriber.next(data);
      subscriber.complete();
    });
  });

const category$ = new Subject();
getDynamoScan$({
  TableName: 'jsfun_category',
}).subscribe(category$);

const getSiteData$ = () =>
  forkJoin([category$, getDynamoScan$({ TableName: 'jsfun_site' })]);

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

const githubDataScan$ = getDynamoScan$({
  TableName: 'jsfun_git',
  // ScanFilter: {
  //   category: {
  //     ComparisonOperator: 'LE',
  //     AttributeValueList: [
  //       {
  //         N: '1',
  //       },
  //     ],
  //   },
  // },
});

const getGithubData$ = () => {
  let bar = null;
  return forkJoin([
    category$,
    githubDataScan$.pipe(
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
