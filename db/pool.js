const { Pool } = require("pg");

const pool = new Pool({
  user: "annamakagonova",
  host: "localhost",
  database: "reviews",
  password: "Hackreactor",
  port: 5432,
});

module.exports = pool;
