import path from 'path';
import collectGit from './task/git';
import collectSite from './task/site';
import { viewModelPath } from '../config';

const gitOutputPath = path.join(process.cwd(), viewModelPath.git);
const siteOutputPath = path.join(process.cwd(), viewModelPath.site);

collectSite(siteOutputPath);
collectGit(gitOutputPath, () => {
  console.log('Finish successfully!'); // eslint-disable-line no-console
  process.exit();
});
