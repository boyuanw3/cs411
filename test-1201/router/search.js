const express = require('express')
const bodyParser = require('body-parser')
const mysqlConnection = require('../db/mysql')
const fs = require('fs')
const e = require('express')

const router = new express.Router()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


const query = function (sql, req) {
    if (req.body.songName !== '') {
        sql = sql + ' and Song.Song_Name = "' + req.body.songName + '"'
        console.log(sql)
    }

    if (req.body.songYear !== '') {
        sql = sql + ' and Song.Year = "' + req.body.songYear + '"'
        console.log(sql)
    }

    if (req.body.songGenre !== '') {
        sql = sql + ' and Song.Genre_Name = "' + req.body.songGenre + '"'
        console.log(sql)
    }

    if (req.body.songSinger !== '') {
        sql = sql + ' and Song.Singer_Name = "' + req.body.songSinger + '"'
        console.log(sql)
    }

    if (req.body.songAlbum !== '') {
        sql = sql + ' and Song.Album_Name = "' + req.body.songAlbum + '"'
        console.log(sql)
    }

    if (req.body.genreName !== '') {
        sql = sql + ' and Genre.Genre_Name = "' + req.body.genreName + '"'
        console.log(sql)
    }

    if (req.body.genreYear !== '') {
        sql = sql + ' and Genre.Origin_Year = "' + req.body.genreYear + '"'
        console.log(sql)
    }

    if (req.body.genreCountry !== '') {
        sql = sql + ' and Genre.Origin_Country = "' + req.body.genreCountry + '"'
        console.log(sql)
    }

    if (req.body.singerName !== '') {
        sql = sql + ' and Singer.Singer_Name = "' + req.body.singerName + '"'
        console.log(sql)
    }

    if (req.body.singerGender !== '') {
        sql = sql + ' and Singer.Gender = "' + req.body.singerGender + '"'
        console.log(sql)
    }

    if (req.body.singerDebutYear !== '') {
        sql = sql + ' and Singer.Debut_Year = "' + req.body.singerDebutYear + '"'
        console.log(sql)
    }

    if (req.body.albumName !== '') {
        sql = sql + ' and Album.Album_Name = "' + req.body.albumName + '"'
        console.log(sql)
    }

    if (req.body.albumSinger !== '') {
        sql = sql + ' and Album.Singer_Name = "' + req.body.albumSinger + '"'
        console.log(sql)
    }

    if (req.body.albumLanguage !== '') {
        sql = sql + ' and Album.Language = "' + req.body.albumLanguage + '"'
        console.log(sql)
    }

    return sql
}

router.post('/search/test', urlencodedParser, function (req, res) {

    console.log(req)

})

router.post('/search/song', urlencodedParser, function (req, res) {

    let sql = 'select song.* from song inner join genre inner join singer inner join album on song.genre_name = genre.genre_name and song.singer_name = singer.singer_name and song.album_name = album.album_name '
    const sqlResult = query(sql, req)
    console.log(sqlResult)

    mysqlConnection.query(sqlResult, (error, data) => {
        if (error) throw error;

        let dataToStore = JSON.stringify(data);
        fs.writeFileSync('./data/search.json', dataToStore);
    })

    res.redirect('/search');

})

router.post('/search/genre', urlencodedParser, function (req, res) {


    let sql = 'select distinct genre.* from song inner join genre inner join singer inner join album on song.genre_name = genre.genre_name and song.singer_name = singer.singer_name and song.album_name = album.album_name '
    const sqlResult = query(sql, req)
    console.log(sqlResult)

    mysqlConnection.query(sqlResult, (error, data) => {
        if (error) throw error;

        let dataToStore = JSON.stringify(data);
        fs.writeFileSync('./data/search.json', dataToStore);
    })

    res.redirect('/search');

})
router.post('/search/singer', urlencodedParser, function (req, res) {

    let sql = 'select distinct singer.* from song inner join genre inner join singer inner join album on song.genre_name = genre.genre_name and song.singer_name = singer.singer_name and song.album_name = album.album_name '
    const sqlResult = query(sql, req)
    console.log(sqlResult)

    mysqlConnection.query(sqlResult, (error, data) => {
        if (error) throw error;

        let dataToStore = JSON.stringify(data);
        fs.writeFileSync('./data/search.json', dataToStore);
    })

    res.redirect('/search');
})

router.post('/search/album', urlencodedParser, function (req, res) {

    let sql = 'select distinct album.* from song inner join genre inner join singer inner join album on song.genre_name = genre.genre_name and song.singer_name = singer.singer_name and song.album_name = album.album_name '
    const sqlResult = query(sql, req)
    console.log(sqlResult)

    mysqlConnection.query(sqlResult, (error, data) => {
        if (error) throw error;

        let dataToStore = JSON.stringify(data);
        fs.writeFileSync('./data/search.json', dataToStore);
    })

    res.redirect('/search');
})

module.exports = router