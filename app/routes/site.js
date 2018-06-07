
module.exports = (app) => {

    let controller = app.controllers.site

    app.get('/', controller.home)

}
