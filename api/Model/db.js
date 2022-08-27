const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  database: "crud_db",
  password: "lmvit123",
  port: 5432,
  host: "localhost",
});
module.exports=pool
