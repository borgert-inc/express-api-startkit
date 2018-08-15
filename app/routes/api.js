
module.exports = (app) => {

    let controller = app.controllers.api

    app.get('/', controller.index)

}
