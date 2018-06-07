
const winston = require('winston')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: __basedir + '/logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: __basedir + '/logs/combined.log' })
    ]
})

module.exports = logger
