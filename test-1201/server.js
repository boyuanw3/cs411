const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysqlConnection = require('./db/mysql')
require('./mongodb/src/db/mongoose') //connect to database
const fs = require('fs');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// ======================================================================================
var songSQL = `select * from song;`
mysqlConnection.query(songSQL, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        let dataToStore = JSON.stringify(data);
        fs.writeFileSync('./data/music.json', dataToStore);
        // app.get('/data/music', function (req, res) {
        //   res.send(data);
        // })
    }
})

var genreSQL = 'SELECT * FROM Genre;'
mysqlConnection.query(genreSQL, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        let dataToStore = JSON.stringify(data);
        fs.writeFileSync('./data/genre.json', dataToStore);
    }
})

var singerSQL = 'SELECT * FROM Singer;'
mysqlConnection.query(singerSQL, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        let dataToStore = JSON.stringify(data);
        fs.writeFileSync('./data/singer.json', dataToStore);
    }
})

var albumSQL = 'SELECT * FROM Album;'
mysqlConnection.query(albumSQL, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        let dataToStore = JSON.stringify(data);
        fs.writeFileSync('./data/album.json', dataToStore);
    }
})


// server your css as static
app.use(express.static('public'));
app.use(bodyParser.json());

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

app.get("/album", function (req, res) {
  res.sendFile(__dirname + "/album.html");
})

app.get("/search", function (req, res) {
  res.sendFile(__dirname + "/search.html");
})

app.get("/profile", function (req, res) {
  res.sendFile(__dirname + "/profile.html");
})

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/login.html");
})

app.get("/preference", function (req, res) {
  res.sendFile(__dirname + "/preference.html");
})

// data
app.get("/data/music", function (req, res) {
  res.sendFile(__dirname + "/data/music.json");
})

app.get("/data/genre", function (req, res) {
  res.sendFile(__dirname + "/data/genre.json");
})

app.get("/data/singer", function (req, res) {
  res.sendFile(__dirname + "/data/singer.json");
})

app.get("/data/album", function (req, res) {
  res.sendFile(__dirname + "/data/album.json");
})

app.get("/data/search", function (req, res) {
  res.sendFile(__dirname + "/data/search.json");
})

app.get("/data/user", function (req, res) {
  res.sendFile(__dirname + "/data/user.json");
})






// ======================================================================================
// user router
const userRouter = require('./mongodb/src/router/user')
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded())
app.use(userRouter)

// ======================================================================================
// Song router 
const songRouter = require('./router/song')
app.use(songRouter)

// ======================================================================================
// singer router 
// const singerRouter = require('./router/singer')
// app.use(singerRouter)

// ======================================================================================
// genre router
// const genreRouter =require('./router/genre')
// app.use(genreRouter)
// urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.post('/genre/update/:id', bodyParser.json(), (req, res) => {
//   console.log(req.body)
//   console.log(req.params)
// })

// ======================================================================================
// profile router
const profileRouter = require('./router/profile')
app.use(profileRouter)


// ======================================================================================
// search router
const searchRouter = require('./router/search')
app.use(searchRouter)



// ======================================================================================
// start your server
app.listen(3000, () => console.log('Server started at port 3000'))
