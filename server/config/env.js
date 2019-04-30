const { env } = process;

module.exports = {
  port: env.PORT || 8080,
  ip: 'localhost',
};
