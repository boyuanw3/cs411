const mysql = require('mysql');
const fs = require('fs');

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "music",
    multipleStatements:true
})

mysqlConnection.connect((error) => {
    if (!error) {
        console.log('connected');
    } else {
        console.log('connection Failed')
    }
})

mysqlConnection.query('SELECT * FROM Song', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        let dataToStore = JSON.stringify(data);
        fs.writeFileSync('./data/music.json', dataToStore);
    }
})

mysqlConnection.end();

module.exports = mysqlConnection;