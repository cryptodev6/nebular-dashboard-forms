const mysql = require('mysql');

const dbcon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'DB!curAeL121og!ygf@@@$$',
    database: 'nebulatDsh_api'
})

dbcon.connect(function (err, res) {
    if (err) throw (err)
    console.log('database connected');
})

module.exports = dbcon;