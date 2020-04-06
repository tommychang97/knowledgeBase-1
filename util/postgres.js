const { Pool } = require('pg');

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    database: 'postgres',
    password: 'sprite04051111',
    port: 5432,
    ssl: false,
});

module.exports = pool;
