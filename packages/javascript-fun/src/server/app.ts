import * as express from 'express';
import { gitMd, linkMd, staticHtml } from './middleware';
import { staticFolder, publicPath } from '../config';

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.get('/', gitMd);
  app.get('/node', gitMd);
  app.get('/library', gitMd);
  app.get('/site', linkMd);
} else {
  app.get('/', staticHtml);
  app.get('/node', staticHtml);
  app.get('/library', staticHtml);
  app.get('/site', staticHtml);
}

app.use(publicPath, express.static(`${staticFolder}/public`));

export default app;
