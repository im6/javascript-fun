'use strict';
const express = require('express'),
  router = express.Router(),
  globalConfig = require('../config/env'),
  ctr = require("./ctr");


router.get('/', ctr.main);
router.get('/node', ctr.node);
router.get('/library', ctr.library);
router.get('/site', ctr.site);
router.get('/demo', ctr.demo);
router.get('/*', ctr.error);


module.exports = router;
