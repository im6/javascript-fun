'use strict';
const express = require('express'),
  router = express.Router(),
  globalConfig = require('../config/env'),
  ctr = require("./ctr");

router.use(ctr.main);

module.exports = router;
