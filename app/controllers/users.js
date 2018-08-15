
module.exports = (app) => {

    // ------------------------------------------------------------------------

    // Define logger 
    const catchError = (e) => {

        app.helpers.logger.log({
            date: new Date(),
            level: 'error',
            message: e.message,
            filename: __filename
        })

    }

    // ------------------------------------------------------------------------

    return {

        /**
         * Get users with paginate
         * route: /users
         */
        index: async (req, res) => {

            try {

                // Paginate
                let limit = 10
                let page = req.query.page || 0
                let offset = page * limit
        
                // Get users by model
                let users = await app.models.user.paginate({}, {
                    offset,
                    limit
                })
                    .then(users => {
                        return users
                    })
                    .catch(() => {
                        throw new Error('Unable to load users.')
                    })

                // return json
                res.status(200).json({ users })

            } catch (e) {

                // Invoke logger
                catchError(e)

                // Return error message
                res.status(500).json({
                    error: e.message
                })

            }

        },

        /**
         * 
         */
        store: async (req, res) => {

            try {

                let response = await app.services.users.store(req.body)

                if (! response.status) {
                    throw new Error(response.message)
                }

                res.status(response.code).json(response)

            } catch (e) {
                
                catchError(e)

                res.status(500).json({
                    error: e.message
                })

            }

        },

        update: async (req, res) => {

            try {

                let response = await app.services.users.update(req.params.id, req.body)
        
                if (! response.status) {
                    throw new Error(response.message)
                }
        
                res.status(200).json(response)

            } catch (e) {
                
                catchError(e)

                res.status(500).json({
                    error: e.message
                })

            }
            
        },

        show: async (req, res) => {

            try {

                let user = await app.models.user.findById(req.params.id)
                    .then(user => {
                        return user
                    })
                    .catch(() => {
                        throw new Error('Could not load user data.')
                    })

                res.status(200).json({
                    user
                })

            } catch (e) {

                catchError(e)

                res.status(500).json({
                    error: e.message
                })

            }
            
        },

        destroy: async (req, res) => {

            try {

                let response = await app.services.users.destroy(req.params.id)
        
                if (! response.status) {
                    throw new Error(response.message)
                } 

                res.status(200).json(response)

            } catch (e) {
                
                catchError(e)

                res.status(500).json({
                    error: e.message
                })

            }
            
        }

    }
}
