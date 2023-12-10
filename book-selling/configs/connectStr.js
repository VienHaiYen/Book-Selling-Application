require("dotenv").config();

module.exports = {
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5433,
  database: process.env.DATABASE || 'postgres',
  user: process.env.USER || 'postgres',
  password: process.env.PASSWORD || '123',
};
