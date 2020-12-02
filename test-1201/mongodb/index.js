require('./src/db/mongoose') //connect to database
const express = require('express')
const userRouter = require('./src/router/user')


const app = express()

app.use(express.json())
// app.use(bodyParser.json())
app.use(userRouter)