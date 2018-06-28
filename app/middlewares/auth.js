'use strict'

module.exports = () => {
    return {
        my_middleware: (req, res, next) => {

            // your logic

            next()
        }
    }
}

