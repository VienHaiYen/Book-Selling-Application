const pgp = require('pg-promise')({});
const databaseConfig = require('./connectStr.js');
const db = pgp(databaseConfig);

module.exports = {
  pgp,
  db,
};