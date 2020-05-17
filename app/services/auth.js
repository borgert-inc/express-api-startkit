
module.exports = (app) => {

    return {

        login: async (data) => {

            try {

                return await app.models.user
                    .create(data)
                    .then(user => {
                        return {
                            status: true,
                            message: 'User has been successfully logged.',
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
                    status: false,
                    message: e.message || 'Could not auth user.',
                    exception: e.message
                }
        
            }
            
        }

    }

}
