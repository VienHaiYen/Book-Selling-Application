const pgp = require('pg-promise')({})
const databaseConfig = require('./connectStr')
const db = pgp(databaseConfig)
module.exports = {
  pgp,
  db,
}
