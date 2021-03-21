
module.exports = (app) => {

    // Users controllers
    let controller = app.controllers.users
    // let authMiddleware = app.middlewares.auth.auth

    app.get('/users', controller.index)
    app.post('/users', controller.store)
    app.get('/users/:id', controller.show)
    app.put('/users/:id', controller.update)
    app.delete('/users/:id', controller.destroy)

}
