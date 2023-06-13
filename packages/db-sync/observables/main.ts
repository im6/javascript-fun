import { getCategory$, getGithub$, getSite$ } from 'dynamodb-observables';
import { updateCollection$, deleteCollection$ } from './crud';
import { concat, switchMap, iif, of } from 'rxjs';

const category$ = getCategory$().pipe(
  switchMap((a) =>
    iif(
      () => (a as any[]).length > 0,
      deleteCollection$('category').pipe(
        switchMap(() => updateCollection$('category', a))
      ),
      of({
        insertedCount: 0,
        error: 'get category failed',
      })
    )
  )
);

const git$ = getGithub$().pipe(
  switchMap((a) =>
    iif(
      () => (a as any[]).length > 0,
      deleteCollection$('git').pipe(
        switchMap(() => updateCollection$('git', a))
      ),
      of({
        insertedCount: 0,
        error: 'get github failed',
      })
    )
  )
);

const site$ = getSite$().pipe(
  switchMap((a) =>
    iif(
      () => (a as any[]).length > 0,
      deleteCollection$('site').pipe(
        switchMap(() => updateCollection$('site', a))
      ),
      of({
        insertedCount: 0,
        error: 'get site failed',
      })
    )
  )
);

const main$ = concat(category$, git$, site$);

export default main$;
