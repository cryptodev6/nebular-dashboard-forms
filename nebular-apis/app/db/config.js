const mysql = require('mysql2');

const dbcon = mysql.createConnection({
    host: 'localhost',
    user: 'phpmyadmin',
    password: 'root',
    database: 'westmetals'
})

dbcon.connect(function (err, res) {
    if (err) throw (err)
    console.log('database connected');
})

module.exports = dbcon;