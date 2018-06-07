'use strict'

global.__basedir = __dirname

require('dotenv-extended').load()

// ---------------------------------------------------------------------------------------

// Packages
const createError = require('http-errors')
const express = require('express')
const session = require('express-session')
const load = require('express-load')
const flash = require('express-flash')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const stylus = require('stylus')
const helmet = require('helmet')
const mongoose = require('mongoose')

// ---------------------------------------------------------------------------------------

// App Express
const app = express()

// ---------------------------------------------------------------------------------------

// Mongoose 
const MongoStore = require('connect-mongo')(session)

mongoose.connect(process.env.MONGO_DB)
mongoose.connection.on('open', () => {
    console.log('A new connection has been pluged')
})

// ---------------------------------------------------------------------------------------

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'twig')

// ---------------------------------------------------------------------------------------

// Middlewares
app.use(helmet())
app.use(bodyParser.json())
app.use(stylus.middleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// ---------------------------------------------------------------------------------------

// Session
app.use(session({
    secret: process.env.APP_TOKEN,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}))

// ---------------------------------------------------------------------------------------


app.use(function (req, res, next) {
    res.locals = {
        user: req.session.user || null,
        seo: {
            title: 'MyApp'
        }
    }
    next()
})

// ---------------------------------------------------------------------------------------

// Express load
load('models', { cwd: 'app' })
    .then('helpers')
    .then('controllers')
    .then('services')
    .then('middlewares')
    .then('routes')
    .into(app)

// ---------------------------------------------------------------------------------------

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// ---------------------------------------------------------------------------------------

// Error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
