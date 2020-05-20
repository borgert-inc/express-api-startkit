
module.exports = (app) => {

    let controller = app.controllers.register

    app.post('/register', controller.register)

}
