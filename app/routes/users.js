
module.exports = (app) => {

    // Users controllers
    let controller = app.controllers.users
    let authMiddleware = app.middlewares.auth.auth

    app.get('/users', authMiddleware, controller.index)
    app.post('/users', authMiddleware, controller.store)
    app.get('/users/:id', authMiddleware, controller.show)
    app.put('/users/:id', authMiddleware, controller.update)
    app.delete('/users/:id', authMiddleware, controller.destroy)

}
