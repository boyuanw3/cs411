const jwt = require('jsonwebtoken')
const User = require('../model/user')

const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, '411Proj1-STAT')
        const user = await User.findOne({ _id: decoded._id, 'token.token': token })

        if (!user) {
            throw new Error()
        }

        req.user = user
        req.token = token

        next()

    } catch (e) {
        res.status(401).send({ error: 'Please authenticate'})
    }
}

module.exports = auth