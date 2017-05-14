'use strict';

const globalConfig = require('../config/env'),
  mysql = require('../resource/mysqlConnection'),
  path = require('path'),
  inst1 = require('./render/main'),
  inst2 = require('./render/site'),
  period = 100;

let privateFn = {
  cnt: 0,
  update(){
    console.log("================================");
    console.log(`updating the views...`);
    console.log("================================");
    inst1.start();
    inst2.start();
  }
};

privateFn.update();

module.exports = {
  main: function(req, res, next){
    privateFn.cnt ++ ;

    if(privateFn.cnt >= period){
      privateFn.cnt = 0;
      privateFn.update();
    }
    next();
  },
};