
module.exports = (app) => {

    return {

        index: async (req, res) => {

            try {

                //app.helpers.slack.postMessage({ text: 'My message is here' })
                
                res.status(200).json({
                    name: 'express-api-startkit',
                    github: 'https://github.com/borgert-inc/express-api-startkit'
                })
                
            } catch (e) {
                
                res.status(500).json({
                    error: e.message
                })

            }

        }

    }
}
