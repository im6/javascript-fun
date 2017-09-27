"use strict";

const env = process.env;

module.exports = {
  isDev: env.NODE_ENV === 'dev',
  port: env.PORT || 8080,
  ip: 'localhost',
};