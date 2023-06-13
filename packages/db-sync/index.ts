require('dotenv').config({ path: '../../../javascript-fun.env' });

import main$ from './observables/main';

main$.subscribe({
  next: (res: any) => {
    console.log(res.insertedCount);
  },
  complete: () => {
    console.log('sync complete!');
    process.exit();
  },
});
