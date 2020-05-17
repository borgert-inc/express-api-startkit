
const bcrypt = require('bcryptjs')

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

                if (data.password) {
                    data.password = await bcrypt.hash(data.password, 10)
                }

                return await app.models.user.findByIdAndUpdate(id, data)
                    .then(() => {

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
