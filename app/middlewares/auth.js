'use strict'

const jwt = require('jsonwebtoken')

module.exports = (app) => {
    return {
        auth: async (req, res, next) => {            
            try {

                const token = req.header('Authorization').replace('Bearer ', '')
                const data = jwt.verify(token, process.env.JWT_KEY)
                const user = await app.models.user.findOne({ _id: data._id, 'tokens.token': token })

                if (!user) {
                    throw new Error('No find user')
                }

                req.user = user
                req.token = token

                next()

            } catch (error) {
                res.status(401).send({ error: 'Not authorized to access this resource' })
            }
        }
    }
}

