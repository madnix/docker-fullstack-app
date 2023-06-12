const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: 'madnix09183859',
    database: 'dockerdb'
});

exports.pool = pool;