"use strict";
const path = require('path'),
  express = require('express'),
  globalEnv = require('./server/config/env'),
  app = express();

app.set('x-powered-by', false);
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./server/route'));

let server = app.listen(globalEnv.port, globalEnv.ip, function () {
  console.log( "Listening on " + globalEnv.ip + ": " + globalEnv.port + ' ...' );
});