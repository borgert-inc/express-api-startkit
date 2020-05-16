var slack = require('slack')

module.exports = (app) => {
    return {
        postMessage: ({ message, channel }) => {
            
            if (!process.env.SLACK_TOKEN) return false

            slack.chat.postMessage({
                token: process.env.SLACK_TOKEN,
                channel: (channel || process.env.SLACK_CHANNEL) || 'general',
                text: message,
                as_user: false,
                username: 'My test',
                icon_emoji: ':chart_with_upwards_trend:'
            })

        }
    }
}

