'use strict';

const globalConfig = require('../config/env'),
  mysql = require('../resource/mysqlConnection'),
  path = require('path'),
  inst1 = require('./render/main'),
  inst2 = require('./render/site');

let privateFn = {
  day: new Date().getDate(),
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
    let currentDay = new Date().getDate();
    if(currentDay != privateFn.day){
      privateFn.day = currentDay;
      privateFn.update();
    }
    next();
  }
};