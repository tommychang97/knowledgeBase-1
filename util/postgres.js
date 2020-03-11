const Pool = require("pg").Pool;

const pool = new Pool({
    host: "ec2-35-172-85-250.compute-1.amazonaws.com",
    user: "lsyywulcxmqgzb",
    database: "daa0khibtd0c9f",
    password:
        "96927df37a49da84cfb59474b52e0b2869b4bf6622faeef33dc116a22cfa90eb",
    port: 5432,
    ssl: true,
});

module.exports = pool;
