'use strict'

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const mongoosePaginate = require('mongoose-paginate-v2')

module.exports = (app) => {

    const schema = new mongoose.Schema(
        { 
            name: {
                type: String,
                required: [true, 'Name is required.'],
                trim: true
            },
            email: {
                type: String,
                required: [true, 'Email is required.'],
                unique: true,
                lowercase: true,
                trim: true,
                validate: value => {
                    if (!validator.isEmail(value)) {
                        throw new Error('Invalid Email address')
                    }
                }
            },
            password: {
                type: String,
                required: [true, 'Password is required.'],
                trim: true,
                select: false
            },
            roles: {
                type: Array,
                default: []
            },
            permissions: {
                type: Array,
                default: []
            },
            status: {
                type: Boolean,
                default: true,
                required: [true, 'Status is required.']
            }
        },
        {
            timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
        }
    )

    schema.plugin(mongoosePaginate)

    schema.pre('save', function (next) {
        let user = this
        bcrypt.hash(user.password, 10, function (err, hash){
            if (err) {
                return next(err)
            }
            user.password = hash
            next()
        })
    })

    schema.statics.authenticate = function (email, password, callback) {
        app.models.user.findOne({ email: email })
            .select('+password')
            .exec(function (err, user) {
                if (err) {
                    return callback(err)
                } else if (!user) {
                    let err = new Error('User not find.')
                    err.status = 401
                    return callback(err)
                }
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result === true) {
                        return callback(null, user)
                    } else {
                        return callback()
                    }
                })
            })
    }

    return mongoose.model('user', schema)

}
