
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
                            message: 'User has been successfully registered.',
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
                    message: e.message || 'Could not register user.',
                    exception: e.message
                }
        
            }
            
        },

        update: async (id, data) => {

            try {

                return await app.models.user.findById(id)
                    .then(async user => {
        
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
        
                        await user.save()

                        return {
                            code: 200,
                            status: true,
                            message: 'User successfully updated.'
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
                    message: e.message  || 'Unable to update user.',
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
                            message: 'User successfully removed.'
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
                    message: e.message || 'Unable to remove user.',
                    exception: e.message
                }
        
            }

        }

    }

}
