
module.exports = (app) => {

    return {

        index: async (req, res) => {

            try {

                res.status(200).json({
                    name: 'express-api-startkit',
                    version: '2.0.0',
                    github: 'https://github.com/borgert-inc/express-api-startkit'
                })
                
            } catch (e) {
                
                app.helpers.slack.postMessage({ message: 'My message is here' })

                res.status(500).json({
                    error: e.message
                })

            }

        }

    }
}
