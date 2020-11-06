const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// connection
const mysql = require('mysql');
const fs = require('fs');

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


var songSQL = 'select Song_Id, Song_Name, Year, Singer.Singer_Name, Genre_Name, Album_Name from Song inner join Singer inner join Genre inner join Album on Song.Singer_Id = Singer.Singer_Id and Song.Genre_Id = Genre.Genre_Id and Song.Album_Id = Album.Album_Id;'
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


// using express you don't need this
// const http = require("http").Server(app).listen(3000);

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










app.post('/music/submit', urlencodedParser, function (req, res) {
  
  var name = req.body.name;
  var year = parseInt(req.body.year);
  var genre =  req.body.genre;
  var singer = parseInt(req.body.singer);
  var album = req.body.album;
  var songId = fs.readFileSync('./data/music.json');
  songId = JSON.parse(songId);
  songId = songId[songId.length - 1].Song_Id + 1;

  
  // after submit, insert new record into Song database
  var sql = "INSERT INTO Song (Song_Id, Song_Name, Year, Genre_Id, Singer_Id, Album_Id) VALUES (" + songId + ", '" + name + "', " + year + ", " + genre + ", " + singer + ", '" + album + "')";
  mysqlConnection.query(sql,function (err, data) {
    if (err) {
      throw err
    } else {
      console.log("record inserted");
    };     
  });


  // query the database and update the page
  var songSQL = 'select Song_Id, Song_Name, Year, Singer.Singer_Name, Genre_Name, Album_Name from Song inner join Singer inner join Genre inner join Album on Song.Singer_Id = Singer.Singer_Id and Song.Genre_Id = Genre.Genre_Id and Song.Album_Id = Album.Album_Id;'
  mysqlConnection.query(songSQL, (err, data) => {
      if (err) {
          console.error(err);
      } else {
          let dataToStore = JSON.stringify(data);
          fs.writeFileSync('./data/music.json', dataToStore);
          // app.get('/data/music', function (req, res) {
          //   let dataToStore = JSON.stringify(data);
          //   res.send(dataToStore);

          // })
      }
  })
  res.redirect('/music');

  
})

app.post('/music/delete', urlencodedParser, function (req, res) {

  var id = Object.keys(req.body)[0].split('-')[0];
  
  var sql = 'delete from Song where Song_Id = ' + id;
  
  mysqlConnection.query(sql, function (error, result) {
    if (error) throw error;
    console.log("Song " + id + " deleted");
  })

    // query the database and update the page
  var songSQL = 'select Song_Id, Song_Name, Year, Singer.Singer_Name, Genre_Name, Album_Name from Song inner join Singer inner join Genre inner join Album on Song.Singer_Id = Singer.Singer_Id and Song.Genre_Id = Genre.Genre_Id and Song.Album_Id = Album.Album_Id;'
  mysqlConnection.query(songSQL, (err, data) => {
      if (err) {
          console.error(err);
      } else {
          let dataToStore = JSON.stringify(data);
          fs.writeFileSync('./data/music.json', dataToStore);
          // app.get('/data/music', function (req, res) {
          //   let dataToStore = JSON.stringify(data);
          //   res.send(dataToStore);

          // })
      }
  })

  res.redirect('/music');

})



app.post('/music/update/2', urlencodedParser, function (req, res) {

  var id = req.route.path.split('/')[3];

  // Update year
  var year = req.body.songYear;
  var isYearEmpty = year === '';
  if (isYearEmpty) {
    console.log('no year updated');
  } else {
    mysqlConnection.query('update Song set Year = ' + year + ' where Song_Id = ' + id, (err, result) => {
      if (err) throw err;
      console.log("Song " + id + "'s year changed to " + year);
    })
  }

  // Update genre
  var genre = req.body.songGenre;
  // Update singer
  var singer = req.body.songSinger;
  // Update album
  var album = req.body.songAlbum;




  // query the database and update the page
  // var songSQL = 'select Song_Id, Song_Name, Year, Singer.Singer_Name, Genre_Name, Album_Name from Song inner join Singer inner join Genre inner join Album on Song.Singer_Id = Singer.Singer_Id and Song.Genre_Id = Genre.Genre_Id and Song.Album_Id = Album.Album_Id;'
   mysqlConnection.query(songSQL, (err, data) => {
       if (err) {
           console.error(err);
       } else {
           let dataToStore = JSON.stringify(data);
           fs.writeFileSync('./data/music.json', dataToStore);
       }
   })

  res.redirect('/music');

})


// const getMaxId = function () {
//   mysqlConnection.query('select max(Song_Id) from Song;', (err, data) => {
//     if (err) throw err;
//     var maxId = Object.values(data[0])[0];
//     return maxId;
//   })
// }

// var test = getMaxId();


// var test = setTimeout(getMaxId(), 5000);
// console.log(test, 'test');
























app.post('/search/detail', urlencodedParser, function (req, res) {
  
  var sql, template;
  var songName = req.body.songName;
  var songYear = req.body.songYear;
  var songGenre = req.body.songGenre;
  var songSinger = req.body.songSinger;
  var songAlbum = req.body.songAlbum;
  // console.log(songYear);

  sql = 'select * from Song where Year = ' + songYear;

  if (songName === '' && songYear === '' && songGenre === '' & songSinger === '' & songAlbum === '') {
    var sql = 'select * from Song where Song_Id = -1'
  } 
  // else {
  //   if (!songYear === '') {sql = template + songYear};
  // }

  // console.log(sql);
  

  mysqlConnection.query(sql, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        let dataToStore = JSON.stringify(data);
        fs.writeFileSync('./data/search.json', dataToStore);
    }
  })


  res.redirect('/search');

})














// start your server
app.listen(3000, () => console.log('Server started at port 3000'))
