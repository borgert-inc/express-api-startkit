
module.exports = (app) => {

    let controller = app.controllers.auth
    let authMiddleware = app.middlewares.auth.auth

    app.post('/auth/login', controller.login)
    app.post('/auth/logout', authMiddleware, controller.logout)

}
