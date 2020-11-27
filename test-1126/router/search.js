const express = require('express')
const bodyParser = require('body-parser')
const mysqlConnection = require('../db/mysql')
const fs = require('fs')

const router = new express.Router()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/search/detail', urlencodedParser, function (req, res) {
  
    var sql, template;
    var songName = req.body.songName;
    var songYear = req.body.songYear;
    var songGenre = req.body.songGenre;
    var songSinger = req.body.songSinger;
    var songAlbum = req.body.songAlbum;
    console.log(songYear);
  
    if (songYear !== '') {
        sql = `select Song_Id, Song_Name, Year, Singer.Singer_Name, Genre_Name, Album_Name 
            from Song inner join Singer inner join Genre inner join Album 
            on Song.Singer_Id = Singer.Singer_Id and Song.Genre_Id = Genre.Genre_Id and Song.Album_Id = Album.Album_Id`
        sql = sql + ' where Year = ' + songYear;
        console.log(sql)
  
        mysqlConnection.query(sql, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                let dataToStore = JSON.stringify(data);
                fs.writeFileSync('./data/search.json', dataToStore);
            }
        })
    
        res.redirect('/search');
      
    }
  
})

module.exports = router