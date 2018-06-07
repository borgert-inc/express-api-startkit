
module.exports = (app) => {

    return {

        store: async (data) => {

            try {

                return await app.models.user
                    .create(data)
                    .then(user => {
                        return {
                            code: 200,
                            status: true,
                            message: 'Usuário foi cadastrado com sucesso.',
                            data: user
                        }
                    })
                    .catch(err => {
        
                        for (var key in err.errors) {
                            throw new Error(err.errors[key].message)
                        }
        
                        throw new Error(err)
                    })
        
            } catch (e) {
        
                return {
                    code: 500,
                    status: false,
                    message: e.message || 'Não foi possível cadastrar o usuário.',
                    exception: e.message
                }
        
            }
            
        },

        update: async (id, data) => {

            try {

                return await app.models.user.findById(id)
                    .then(user => {
        
                        if (data.name) {
                            user.name = data.name
                        }
        
                        if (data.email) {
                            user.email = data.email
                        }
        
                        if (data.roles) {
                            user.roles = data.roles 
                        }
        
                        if (data.status) {
                            user.status = data.status
                        }
        
                        if (data.password) {
                            user.password = data.password
                        }
        
                        user.save()
                        
                        return {
                            code: 200,
                            status: true,
                            message: 'Usuário foi atualizado com sucesso.'
                        }
                    })
                    .catch(err => {
        
                        for (var key in err.errors) {
                            throw new Error(err.errors[key].message)
                        }
        
                        throw new Error(err)
                    })
        
            } catch (e) {
        
                return {
                    code: 500,
                    status: false,
                    message: e.message  || 'Não foi possível atualizar o usuário.',
                    exception: e.message
                }
        
            }
            
        },

        destroy: async (id) => {

            try {

                return await app.models.user.findByIdAndRemove(id)
                    .then(() => {
                        return {
                            code: 200,
                            status: true,
                            message: 'Usuário foi removido com sucesso.'
                        }
                    })
                    .catch(err => {
        
                        for (var key in err.errors) {
                            throw new Error(err.errors[key].message)
                        }
        
                        throw new Error(err)
                    })
        
            } catch (e) {
        
                return {
                    code: 500,
                    status: false,
                    message: e.message || 'Não foi possível remover o usuário.',
                    exception: e.message
                }
        
            }

        }

    }

}
