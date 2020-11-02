const express = require('express');
const app = express();


const mysql = require('mysql');
const fs = require('fs');

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "804154945pyPY^^",
    database: "WikiMusic",
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

// using express you don't need this
// const http = require("http").Server(app).listen(3000);

// server your css as static
app.use(express.static('public'))

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/home.html");
})

app.get("/music", function (req, res) {
  res.sendFile(__dirname + "/music.html");
})

app.get("/genre", function (req, res) {
  res.sendFile(__dirname + "/genre.html");
})

app.get("/singer", function (req, res) {
  res.sendFile(__dirname + "/singer.html");
})

app.get("/profile", function (req, res) {
  res.sendFile(__dirname + "/profile.html");
})

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/login.html");
})

// data
app.get("/data/music", function (req, res) {
  res.sendFile(__dirname + "/data/music.json");
})


// start your server
app.listen(3000, () => console.log('Server started at port 3000'))
