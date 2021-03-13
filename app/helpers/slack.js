var slack = require('slack')

module.exports = (app) => {
    return {
        postMessage: (obj) => {

            try {

                if (!process.env.SLACK_TOKEN || process.env.SLACK_TOKEN === '') return false

                if (!process.env.SLACK_CHANNEL || process.env.SLACK_CHANNEL === '') return false

                obj.token = process.env.SLACK_TOKEN
                obj.channel = obj.channel || process.env.SLACK_CHANNEL

                slack.chat.postMessage(obj)

            } catch (e) {
                app.helpers.logger.log({
                    date: new Date(),
                    level: 'error',
                    message: e.message,
                    filename: __filename
                })
            }

        }
    }
}

