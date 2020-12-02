const express = require('express')
const User = require('../model/user')
const bodyParser = require('body-parser')
const fs = require('fs');
const mysqlConnection = require('../../../db/mysql')
const auth = require('../middleware/auth');
const { compare } = require('bcrypt');

const router = new express.Router()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()

// create user
router.post('/users', async (req, res) => {
  
    
    try {
        const user = new User(req.body)
        await user.save()
        // const token = await user.generateAuthToken()
        // res.status(201).send({ user, token})
        
        let dataToStore = JSON.stringify(user);
        fs.writeFileSync('./data/user.json', dataToStore);
        
        res.redirect('../../preference');
        
    } catch (e) {
        res.status(400).send(e)
    }
    
    // console.log(req.body)
  
})

// user login
router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findByCredential(req.body.email, req.body.password)
        // const token = await user.generateAuthToken()
        // const token = await user.generateAuthToken()
        // res.send({ user, token})
        const dataToStore = JSON.stringify(user);
        fs.writeFileSync('./data/user.json', dataToStore);
        
        res.redirect('../../profile');
        
    } catch (e) {
        res.status(400).send()
    }
    
})

// user logout
router.post('/users/logout', async (req, res) => {

    const data = {}
    const dataToStore = JSON.stringify(data);
    fs.writeFileSync('./data/user.json', dataToStore);
    
    res.redirect('../../login');
})

// submit preference
router.post('/users/preference', async (req, res) => {
    
    
    const rawData = fs.readFileSync('./data/user.json')
    const originalUser = JSON.parse(rawData);
    const preference = req.body.genre
    // console.log(preference)
    
    try {
        const user = await User.findById(originalUser._id)
        user.preference = preference
        user.save()
        
        const dataToStore = JSON.stringify(user);
        fs.writeFileSync('./data/user.json', dataToStore);
        
        res.redirect('../../profile')
        
    } catch (e) {
        res.status(400).send()
    }
    
    
})

// collect song
router.post('/music/collect/:id', async (req, res) => {
    const selectedId = Number(req.params.id)
    console.log(selectedId)

    const rawMusic = fs.readFileSync('./data/music.json')
    const musics = JSON.parse(rawMusic);

    let selectedSong;
    for (i in musics) {
        if (musics[i].Song_Id === selectedId) {
            selectedSong = musics[i].Song_Name
            break
        }
    }

    const rawUser = fs.readFileSync('./data/user.json')
    const originalUser = JSON.parse(rawUser);

    try {
        let user = await User.findById(originalUser._id)
        user.collect = user.collect.concat(selectedSong)
        user.save()
        
        const dataToStore = JSON.stringify(user);
        fs.writeFileSync('./data/user.json', dataToStore);
        
        res.redirect('../../music')
        
    } catch (e) {
        res.status(400).send()
    }
    
    
    
    // res.redirect('../../music')
})

// rate song
router.post('/music/rate/:id', async (req, res) => {
    
    const ratedSongId = Number(req.params.id)
    const rating = Number(req.body.songRating)
    
    const rawMusic = fs.readFileSync('./data/music.json')
    const musics = JSON.parse(rawMusic)
    
    let ratedSongName
    let countRating
    let avgRating
    for (i in musics) {
        if (musics[i].Song_Id === ratedSongId) {
            ratedSongName = musics[i].Song_Name
            countRating = musics[i].count_Rating
            avgRating = (musics[i].Avg_Rating * countRating + rating) / (countRating + 1)
            countRating = countRating + 1
            break
        }
    }

    const updateSQL = 'update song set Avg_Rating = ' + avgRating + ', count_Rating = ' + countRating + ' where Song_Id = ' + ratedSongId
    mysqlConnection.query(updateSQL, (error, result) => {
        if (error) throw error
        console.log('Average rating updated!')
    })
    mysqlConnection.query(`select * from song;`, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            let dataToStore = JSON.stringify(data);
            fs.writeFileSync('./data/music.json', dataToStore);
        }
    })
    
    const rawUser = fs.readFileSync('./data/user.json')
    const originalUser = JSON.parse(rawUser)
    
    try {
        
        let user = await User.findById(originalUser._id)
        let added = {}
        added.songName = ratedSongName
        added.songRating = rating
        user.ratedSong = user.ratedSong.concat(added)
        user.save()
        
        const dataToStore = JSON.stringify(user);
        fs.writeFileSync('./data/user.json', dataToStore);

        res.redirect('../../music')
        
    } catch (e) {
        res.status(400).send(e)
    }


})


module.exports = router