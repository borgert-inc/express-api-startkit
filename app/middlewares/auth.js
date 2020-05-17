'use strict'

const jwt = require('jsonwebtoken')

module.exports = (app) => {
    return {
        auth: async (req, res, next) => {            
            try {

                const authorization = req.header('Authorization')

                if (!authorization) {
                    throw new Error()
                }

                const token = authorization.replace('Bearer ', '')
                const data = jwt.verify(token, process.env.JWT_KEY)
                const user = await app.models.user.findOne({ _id: data._id, 'tokens.token': token })

                if (!user) {
                    throw new Error('No find user')
                }

                req.user = user
                req.token = token

                next()

            } catch (e) {
                res.status(401).send({ error: e.message || 'Not authorized to access this resource' })
            }
        }
    }
}

