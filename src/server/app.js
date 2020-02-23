import express from 'express';
import { gitMd, linkMd } from './middleware';
import { staticFolder, publicPath } from '../config';

const app = express();
app.get('/', gitMd);
app.get('/node', gitMd);
app.get('/library', gitMd);
app.get('/site', linkMd);
app.use(publicPath, express.static(`${staticFolder}/public`));

export default app;
