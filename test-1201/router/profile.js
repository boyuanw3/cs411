express = require('express')
require('../mongodb/src/db/mongoose') //connect to database
const fs = require('fs')
const User = require('../mongodb/src/model/user')

const router = new express.Router()

// delete collection
router.post('/users/collection/delete/:id', async (req, res) => {
    
    const rawData = fs.readFileSync('./data/user.json')
    const originalUser = JSON.parse(rawData)
    const selectedId = originalUser._id
    const collectId = req.params.id
    
    try {
        let user = await User.findById(selectedId)
        user.collect.splice(collectId, 1)
        user.save()

        const dataToStore = JSON.stringify(user);
        fs.writeFileSync('./data/user.json', dataToStore);
        
        res.redirect('/profile')
    } catch (e) {
        res.status(400).send()
    }


})

// delete rated song
router.post('/users/rated/delete/:id', async (req, res) => {

    const rawData = fs.readFileSync('./data/user.json')
    const originalUser = JSON.parse(rawData)
    const ratedId = req.params.id

    try {
        let user = await User.findById(originalUser._id)
        user.ratedSong.splice(ratedId, 1)
        user.save()

        const dataToStore = JSON.stringify(user)
        fs.writeFileSync('./data/user.json', dataToStore)

        res.redirect('/profile')

    } catch (e) {
        res.status(e).send()
    }
})


module.exports = router