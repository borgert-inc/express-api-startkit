
module.exports = (app) => {

    return {

        index: async (req, res) => {

            try {

                let limit = 10
                let page = req.query.page || 0
                let offset = page * limit
        
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

                res.status(200).json({ users })

            } catch (e) {

                res.status(500).json({
                    error: e.message
                })

            }

        },

        store: async (req, res) => {

            try {

                let response = await app.services.users.store(req.body)

                if (! response.status) {
                    throw new Error(response.message)
                }

                res.status(200).json(response)

            } catch (e) {
                
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
                        throw new Error('Could not load user.')
                    })

                res.status(200).json({
                    user
                })

            } catch (e) {

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
                
                res.status(500).json({
                    error: e.message
                })

            }
            
        }

    }
}
