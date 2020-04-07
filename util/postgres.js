const { Pool } = require('pg');

const pool = new Pool({
    host: 'ec2-34-197-212-240.compute-1.amazonaws.com',
    user: 'pdqnqvrhrbcqhp',
    database: 'd2a0td3uisfk76',
    password: '5cee69a724c0080a1560914033ca87d0e0dde8f6bf3833008822bc9171a1f3e0',
    port: 5432,
    ssl: true,
});

module.exports = pool;
