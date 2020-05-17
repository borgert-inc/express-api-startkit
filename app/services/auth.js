
module.exports = (app) => {

    return {

        login: async (data) => {

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
            
        }

    }

}
