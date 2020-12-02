const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')
const mysqlConnection = require('../db/mysql')


const router = new express.Router()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// update genre
router.post('/genre/update/year/:id', urlencodedParser, function (req, res) {
    // console.log(req.body)
    // console.log(req.params)
})


module.express = router