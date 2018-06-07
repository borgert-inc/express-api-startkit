'use strict'

const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const bcrypt = require('bcryptjs')
const mongoosePaginate = require('mongoose-paginate')

module.exports = (app) => {

    const schema = new mongoose.Schema(
        { 
            name: {
                type: String,
                required: [true, 'O campo nome é obrigatório.'],
                trim: true
            },
            email: {
                type: String,
                required: [true, 'O campo e-mail é obrigatório.'],
                unique: true,
                lowercase: true,
                trim: true,
                validate: [
                    validate({
                        validator: 'isEmail',
                        message: 'O campo e-mail não é válido.'
                    })
                ]
            },
            password: {
                type: String,
                required: [true, 'O campo senha é obrigatório.'],
                trim: true,
                select: false
            },
            avatar: {
                type: String
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
                required: [true, 'O campo status é obrigatório.']
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
                    let err = new Error('Usuário não foi encontrado.')
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
