const AWS = require('aws-sdk');
const ProgressBar = require('progress');
const nodeFetch = require('node-fetch');
const { githubUrl } = require('app-constant');
import {
  of,
  from,
  forkJoin,
  tap,
  map,
  delay,
  toArray,
  switchMap,
  concatMap,
  Observable,
  Subject,
  retry,
  catchError,
} from 'rxjs';

import { parseExtractGithub, mergeResult } from './helper';
import { GitSchema, GitParseResult } from './interface';

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const crawlerStepDelay = 800;
const retryAttempt = 3;
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

export const getSiteData$ = () =>
  forkJoin([category$, getDynamoScan$({ TableName: 'jsfun_site' })]);

const getGithubPage$ = (subUrl: string) =>
  new Observable((subscriber) => {
    const httpOptions = {
      timeout: 5 * 1000,
      headers: {
        Cookie,
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
        Host: 'github.com',
      },
    };
    nodeFetch(`${githubUrl}/${subUrl}`, httpOptions)
      .then((res) => res.text())
      .then((res) => {
        subscriber.next(res);
        subscriber.complete();
      })
      .catch((err) => {
        subscriber.error(err);
      });
  });

const githubDataScan$ = getDynamoScan$({
  TableName: 'jsfun_git',
  // ScanFilter: {
  //   category: {
  //     ComparisonOperator: 'EQ',
  //     AttributeValueList: [
  //       {
  //         N: '1',
  //       },
  //     ],
  //   },
  // },
});

export const getGithubData$ = () => {
  let bar;
  return forkJoin([
    category$,
    githubDataScan$.pipe(
      tap((taskList: any) => {
        bar = new ProgressBar('complete :gitIndex of :total: :gtnm', {
          total: taskList.length,
        });
      }),
      switchMap((x) => from<Observable<GitSchema>>(x)),
      map((v: GitSchema, k: number) => [v, k]),
      concatMap(([v, gitIndex]: any[]) =>
        getGithubPage$(v.github).pipe(
          tap(() => {
            bar.tick({ gitIndex: gitIndex + 1, gtnm: v.github });
          }),
          retry(retryAttempt),
          map((v) => parseExtractGithub(v as string)),
          catchError(
            (): Observable<GitParseResult> =>
              of({
                star: -1,
                lastUpdate: '',
              })
          ),
          map(
            (parseRes: GitParseResult): GitSchema => mergeResult(v, parseRes)
          ),
          tap(({ star, github }) => {
            if (star < 0) {
              // eslint-disable-next-line no-console
              console.log(`\n - failed on ${github}`);
            }
          }),
          delay(crawlerStepDelay)
        )
      ),
      toArray()
    ),
  ]);
};
