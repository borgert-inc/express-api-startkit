

module.exports = (app) => {
    return {
        sendMessage: ({ message }) => {
            console.log('slack message', message)
        }
    }
}

