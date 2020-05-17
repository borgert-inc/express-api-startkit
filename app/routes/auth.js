
module.exports = (app) => {

    let controller = app.controllers.auth

    app.post('/auth/login', controller.login)

}
