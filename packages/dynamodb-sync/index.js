const syncTask$ = require('./observables');

syncTask$.subscribe((a) => {
  console.log(a); // eslint-disable-line no-console
});
