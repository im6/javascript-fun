'use strict';

const globalConfig = require('../config/env'),
  mysql = require('../resource/mysqlConnection'),
  path = require('path'),
  viewRoot = path.join(__dirname, '../../public');

const privateFn = {
  
};


module.exports = {
  main: function(req, res, next){
    res.sendFile('/main/index.html',{
      root: viewRoot
    });
  },
  node: function(req, res, next){
    res.sendFile('/main/node.html',{
      root: viewRoot
    });
  },
  library: function(req, res, next){
    res.sendFile('/main/library.html',{
      root: viewRoot
    });
  },

  error: function(req, res, next){
    res.redirect('/');
  },
};