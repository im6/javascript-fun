'use strict';

const globalConfig = require('../config/env'),
  mysql = require('../resource/mysqlConnection'),
  path = require('path'),
  inst1 = require('./render/main'),
  inst2 = require('./render/site');

console.log("================================");
console.log(`updating the views...`);
console.log("================================");
inst1.start();
inst2.start();