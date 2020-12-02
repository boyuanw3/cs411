const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')
const mysqlConnection = require('../db/mysql')


const router = new express.Router()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var songSQL = `select * from song;`

// insert new record to Song table
router.post('/music/submit', urlencodedParser, function (req, res) {
  
    var name = req.body.name;
    var year = req.body.year;
    var genre =  req.body.genre;
    var singer = req.body.singer;
    var album = req.body.album;

    var allSongs = fs.readFileSync('./data/music.json');
    allSongs = JSON.parse(allSongs);
    const songId = allSongs[allSongs.length - 1].Song_Id + 1;

  
    
    // after submit, insert new record into Song database
    var sql = "INSERT INTO Song (Song_Id, Song_Name, Year, Singer_Name, Album_Name, Genre_Name) VALUES (" + songId + ", '" + name + "', " + year  + ", '" + singer + "', '" + album + "', '" + genre + "')";
    mysqlConnection.query(sql,function (err, data) {
      if (err) {
        throw err
      } else {
        console.log("record inserted");
      };     
    });
  
  
    // query the database and update the page
    mysqlConnection.query(songSQL, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            let dataToStore = JSON.stringify(data);
            fs.writeFileSync('./data/music.json', dataToStore);
        }
    })

    mysqlConnection.query('select * from Genre', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            let dataToStore = JSON.stringify(data);
            fs.writeFileSync('./data/genre.json', dataToStore);
        }
    })

    mysqlConnection.query('select * from Singer', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            let dataToStore = JSON.stringify(data);
            fs.writeFileSync('./data/singer.json', dataToStore);
        }
    })

    mysqlConnection.query('select * from Album', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            let dataToStore = JSON.stringify(data);
            fs.writeFileSync('./data/album.json', dataToStore);
        }
    })
    
    res.redirect('/music');
  
    
})

// delete record form song table
router.post('/music/delete', urlencodedParser, function (req, res) {

    var id = Object.keys(req.body)[0].split('-')[0];
    
    var sql = 'delete from Song where Song_Id = ' + id;
    mysqlConnection.query(sql, function (error, result) {
      if (error) throw error;
      console.log("Song " + id + " deleted");
    })
  
      // query the database and update the page
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

// update record
router.post('/music/update/:id', urlencodedParser, function (req, res) {

    var id = req.params.id
    
  
    var year = req.body.songYear;
    var genre = req.body.songGenre;
    var singer = req.body.songSinger;
    var album = req.body.songAlbum;
  
    let sql = 'update Song'

    if (year !== '') {
      sql = sql + ', Year = ' + year
    }

    if (genre !== '') {
      sql = sql + ', Genre_Name = "' + genre + '"'
    }
    
    if (singer !== '') {
      sql = sql + ', Singer_Name = "' + singer + '"'
    }
    
    if (album !== '') {
      sql = sql + ', Album_Name = "' + album + '"'
    }

    sql = sql.replace(',', ' set')
    sql = sql + ' where Song_Id = ' + id
    console.log(sql)
    
    mysqlConnection.query(sql, function (error, result) {
      if (error) throw error;
      console.log("Song " + id + " changed");
    })

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




// ******************** genre ********************
router.post('/genre/update/:id', (req, res) => {
  const id = req.params.id

  let sql = 'update genre'
  if (req.body.genreYear !== '') {
    sql = sql + ', Origin_Year = ' + req.body.genreYear
  }
  
  if (req.body.genreCountry !== '') {
    sql = sql + ', Origin_Country = "' + req.body.genreCountry + '"'
  }

  sql = sql.replace(', ', ' set ')
  sql = sql + ' where Genre_Id = ' + id

  mysqlConnection.query(sql, (error, result) => {
    if (error) throw error
    console.log('Genre ' + id + ' updated!')
  })

  mysqlConnection.query('select * from Genre', (error, data) => {
    if (error) throw error
    const dataToStore = JSON.stringify(data)
    fs.writeFileSync('./data/genre.json', dataToStore)
  })

  res.redirect('/genre')
})



// ******************** genre ********************
router.post('/singer/update/:id', (req, res) => {
  const id = req.params.id

  let sql = 'update singer'
  if (req.body.singerGender !== '') {
    sql = sql + ', Gender = "' + req.body.singerGender + '"'
  }
  if (req.body.singerDebutYear !== '') {
    sql = sql + ', Debut_Year = ' + req.body.singerDebutYear
  }

  sql = sql.replace(',', ' set')
  sql = sql + ' where Singer_Id = ' + id

  mysqlConnection.query(sql, (error, result) => {
    if (error) throw error
    console.log('Singer ' + id + ' updated!')
  })

  mysqlConnection.query('select * from singer', (error, data) => {
    if (error) throw error
    const dataToStore = JSON.stringify(data)
    fs.writeFileSync('./data/singer.json', dataToStore)
  })

  res.redirect('/singer')
})



// ******************** genre ********************
router.post('/album/update/:id', (req, res) => {
  const id = req.params.id

  let sql = 'update album'

  console.log(req.body)

  if (req.body.albumSinger !== '') {
    sql = sql + ', Singer_Name = "' + req.body.albumSinger + '"'
  }

  if (req.body.albumLanguage !== '') {
    sql = sql + ', Language = "' + req.body.albumLanguage + '"'
  }

  sql = sql.replace(',', ' set')
  sql = sql + ' where Album_Id = ' + id


  mysqlConnection.query(sql, (error, result) => {
    if (error) throw error
    console.log('Album ' + id + ' updated!')
  })

  mysqlConnection.query('select * from Album', (error, data) => {
    if (error) throw error
    const dataToStore = JSON.stringify(data)
    fs.writeFileSync('./data/album.json', dataToStore)
  })

  res.redirect('/album')
})

module.exports = router