import express from 'express';
import { gitMd, linkMd } from './middleware';
import { staticFolder } from '../config';

const app = express();
app.get('/', gitMd);
app.get('/node', gitMd);
app.get('/library', gitMd);
app.get('/site', linkMd);
app.use(express.static(`${staticFolder}/public`));

export default app;
