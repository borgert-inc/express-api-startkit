'use strict'

global.__basedir = __dirname

require('dotenv-extended').load()

// ---------------------------------------------------------------------------------------

// Packages
const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// ---------------------------------------------------------------------------------------

// App Express
const app = express()

// ---------------------------------------------------------------------------------------

// Middlewares
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

// ---------------------------------------------------------------------------------------

if (process.env.MONGO_DB) {
    mongoose.connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

// ---------------------------------------------------------------------------------------

// Load packages with consign
consign({ cwd: 'app' })
    .include('models')
    .then('helpers')
    .then('controllers')
    .then('services')
    .then('middlewares')
    .then('routes')
    .into(app)

// ---------------------------------------------------------------------------------------

// Catch not found and forward to error handler
app.use((req, res) => {

    res.status(500).json({
        error: 'Not found',
        url: req.url,
        method: req.method,
        query: req.query,
        params: req.params,
        statusCode: req.statusCode,
        statusMessage: req.statusMessage
    })

})

// ---------------------------------------------------------------------------------------

module.exports = app
