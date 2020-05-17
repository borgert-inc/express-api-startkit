'use strict'

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
            tokens: [{
                token: {
                    type: String,
                    required: true
                }
            }],
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

    schema.methods.generateToken = async function() {
        const user = this
        const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
        user.tokens = user.tokens.concat({ token })
        await user.save()
        return token
    }

    schema.statics.authenticate = async  (email, password) => {

        const user = await app.models.user.findOne({ email }).select('+password')
        if (!user) {
            throw new Error('Invalid email credentials')
        }
        
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            throw new Error('Invalid password credentials')
        }

        return user
    }

    return mongoose.model('user', schema)

}
