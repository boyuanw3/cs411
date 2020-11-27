const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')
const mysqlConnection = require('../db/mysql')


const router = new express.Router()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// insert new record to Song table
router.post('/music/submit', urlencodedParser, function (req, res) {
  
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

// // delete record form song table
router.post('/music/delete', urlencodedParser, function (req, res) {

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

// // update record
router.post('/music/update/:id', urlencodedParser, function (req, res) {

    var id = req.params.id
    
  
    var year = req.body.songYear;
    var genre = req.body.songGenre;
    var singer = req.body.songSinger;
    var album = req.body.songAlbum;
  
    if (year !== '') {
      mysqlConnection.query('update Song set Year = ' + year + ' where Song_Id = ' + id, function (error, result) {
        if (error) throw error;
        console.log("Song " + id + "'s year changed to " + year);
      })
    }
  
     // query the database and update the page
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

module.exports = router