const AWS = require('aws-sdk');
const ProgressBar = require('progress');
const nodeFetch = require('node-fetch');
const { githubUrl } = require('app-constant');
import {
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
} from 'rxjs';
import { format, parseISO, differenceInMonths } from 'date-fns';
import { parseExtractGithub } from './helper';
import { GitSchema, GitParseResult } from './interface';

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

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

export const getSiteData$ = () =>
  forkJoin([category$, getDynamoScan$({ TableName: 'jsfun_site' })]);

const getGithubPage$ = (subUrl: string) => {
  const httpOptions = {
    timeout: 5 * 1000,
    headers: {
      Cookie,
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
      Host: 'github.com',
    },
  };
  return from(
    nodeFetch(`${githubUrl}/${subUrl}`, httpOptions).then((res) => res.text())
  );
};

const githubDataScan$ = getDynamoScan$({
  TableName: 'jsfun_git',
  // ScanFilter: {
  //   category: {
  //     ComparisonOperator: 'EQ',
  //     AttributeValueList: [
  //       {
  //         N: '22',
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
        bar = new ProgressBar('downloading :current of :total: :gtnm', {
          total: taskList.length,
        });
      }),
      switchMap((x) => from<Observable<GitSchema>>(x)),
      concatMap((v) =>
        getGithubPage$(v.github).pipe(
          map((v) => parseExtractGithub(v as string)),
          map((parseRes: GitParseResult): GitSchema => {
            const { star, lastUpdate } = parseRes;
            const parsedDate = parseISO(lastUpdate);
            const diff = differenceInMonths(new Date(), parsedDate);
            const inactiveDate =
              diff > 6 ? format(parsedDate, 'MMM d, yyyy') : '';
            return {
              ...v,
              star,
              inactiveDate,
              name: v.name || v.github.split('/')[1],
            };
          }),
          tap(({ github }) => {
            bar.tick({ gtnm: github });
          }),
          delay(crawlerStepDelay)
        )
      ),
      toArray()
    ),
  ]);
};
