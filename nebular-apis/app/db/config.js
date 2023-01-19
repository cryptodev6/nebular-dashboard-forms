const mysql = require('mysql');

const dbcon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nebulat_dsh'
})

dbcon.connect(function (err, res) {
    if (err) throw (err)
    console.log('database connected');
})

module.exports = dbcon;