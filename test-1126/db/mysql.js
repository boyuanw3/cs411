mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "804154945pyPY^^",
    database: "Music",
    multipleStatements:true
})

mysqlConnection.connect((error) => {
    if (!error) {
        console.log('connected');
    } else {
        console.log('connection Failed')
    }
})

module.exports = mysqlConnection