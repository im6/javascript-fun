
const path = require('path');
const express = require('express');
const globalEnv = require('./config/env');
const app = express();

app.set('x-powered-by', false);
app.use(express.static(path.join(__dirname, '../public')));

app.listen(globalEnv.port, globalEnv.ip, () => {
  const msg = `Listening on http://${globalEnv.ip}:${globalEnv.port}`;
  console.log(msg);
});
