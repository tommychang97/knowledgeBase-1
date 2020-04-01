"use strict";

const Pool = require("pg").Pool;

const pool = new Pool({
    host:'127.0.0.1',
    user:'postgres',
    database:'postgres',
    password:'yourpassword',
    port: 5432,
    ssl: false
});

module.exports = pool;
