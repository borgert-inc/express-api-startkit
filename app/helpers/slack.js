var slack = require('slack')

module.exports = (app) => {
    return {
        postMessage: (obj) => {

            try {

                if (!process.env.SLACK_TOKEN && (obj.channel || process.env.SLACK_CHANNEL)) return false

                obj.token = process.env.SLACK_TOKEN
                obj.channel = obj.channel || process.env.SLACK_CHANNEL

                slack.chat.postMessage(obj)

            } catch (e) {
                console.log('error', e.message)
            }

        }
    }
}

