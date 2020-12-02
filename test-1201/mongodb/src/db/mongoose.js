const mongoose =  require('mongoose')
const User = require('../model/user')

mongoose.connect('mongodb://127.0.0.1:27017/WikiMusic-user', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

