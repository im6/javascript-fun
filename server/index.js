const path = require('path');
const express = require('express');

const port = '3000';
const host = 'localhost';
const app = express();

app.set('x-powered-by', false);
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}`);
});
