
module.exports = (app) => {

    return {

        login: async (req, res) => {

            try {

                const { email, password } = req.body

                const user = await app.models.user.authenticate(email, password)

                if (!user) {
                    return res.status(401).send({
                        error: 'Login failed! Check authentication credentials'
                    })
                }

                const token = await user.generateToken()
                
                res.status(200).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token
                })
                
            } catch (e) {
                
                res.status(500).json({
                    error: e.message
                })

            }

        }

    }
}
