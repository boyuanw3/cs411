const express = require('express')
const User = require('../model/user')
const bodyParser = require('body-parser')
const fs = require('fs');
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

router.post('/music/collect/:id', async (req, res) => {
    const selectedId = Number(req.params.id)

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


module.exports = router