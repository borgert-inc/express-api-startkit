
const winston = require('winston')
require('winston-daily-rotate-file')

let transport = new(winston.transports.DailyRotateFile)({
    filename: __basedir + '/logs/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '14d'
})

const logger = new(winston.createLogger)({
    transports: [
        transport
    ]
})

module.exports = logger
