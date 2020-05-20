
module.exports = (app) => {

    return {

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

        }

    }
}
