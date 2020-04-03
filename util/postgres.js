'use strict';

const Pool = require('pg').Pool;

const pool = new Pool({
    host: '127.0.0.1',
    user: 'knowledgebase',
    database: 'postgres',
    password: 'dev',
    port: 5432,
    ssl: true,
});

module.exports = pool;
