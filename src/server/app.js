import express from 'express';
import { gitMd, linkMd } from './middleware';

const app = express();
app.get('/', gitMd);
app.get('/node', gitMd);
app.get('/library', gitMd);
app.get('/site', linkMd);
app.use(express.static('local/public'));

export default app;
