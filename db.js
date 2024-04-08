const pg = require('pg');
const { PG_DATABASE, PG_HOST, PG_PASSWORD, PG_PORT, PG_USER } = require('./config');

const pool = new pg.Pool({
  port: PG_PORT,
  host: PG_HOST,
  user: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE
});

pool.on("connect", () => {
  console.log("connected to the db");
});

// Export the pool instance
module.exports = { pool };
