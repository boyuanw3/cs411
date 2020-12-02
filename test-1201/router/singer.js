const express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser')


const router = new express.Router()
const urlencodedParser = bodyParser.urlencoded( {extended: false} )

router.post('/singer/update/:id', (req, res) => {
    console.log(req.body)
})