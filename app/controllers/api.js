
module.exports = (app) => {

    const catchError = (e) => {

        app.helpers.logger.log({
            date: new Date(),
            level: 'error',
            message: e.message,
            filename: __filename
        })

    }

    return {

        index: async (req, res) => {

            try {

                res.status(200).json({
                    name: 'express-api-startkit',
                    version: '2.0.0',
                    github: 'https://github.com/borgert-inc/express-api-startkit'
                })

            } catch (e) {

                catchError(e)

                res.status(500).json({
                    error: e.message
                })

            }

        }

    }
}
