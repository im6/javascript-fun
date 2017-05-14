"use strict";
const path = require('path'),
  express = require('express'),
  globalEnv = require('./server/config/env'),
  app = express(),
  task = require('./server/task'),
  route = require('./server/route');

app.set('x-powered-by', false);
app.use(express.static(path.join(__dirname, 'public')));
app.use(task);
app.use(route);

let server = app.listen(globalEnv.port, globalEnv.ip, function () {
  console.log( "Listening on " + globalEnv.ip + ": " + globalEnv.port + ' ...' );
});