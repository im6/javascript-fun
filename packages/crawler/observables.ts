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
import { getCategory$, getGithub$, getSite$ } from 'dynamodb-observables';

const crawlerStepDelay = 800;
const retryAttempt = 3;
const { MY_COOKIE: Cookie } = process.env;

const category$ = new Subject();
getCategory$().subscribe(category$);

export const getSiteData$ = () => forkJoin([category$, getSite$()]);

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

export const getGithubData$ = () =>
  forkJoin([
    category$,
    getGithub$().pipe(
      switchMap((x: any) => {
        const bar = new ProgressBar('complete :gitIndex of :total: :gtnm', {
          total: x.length,
        });
        return from<Observable<GitSchema>>(x).pipe(
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
                (parseRes: GitParseResult): GitSchema =>
                  mergeResult(v, parseRes)
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
        );
      })
    ),
  ]);
