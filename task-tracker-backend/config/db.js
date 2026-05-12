const { Pool, Connection } = require('pg');
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve("../.env") });

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});


pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;