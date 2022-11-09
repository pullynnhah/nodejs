const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE
});

module.exports = pool;
