
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
                    name: user.name,
                    email: user.email,
                    token
                })
                
            } catch (e) {
                
                res.status(500).json({
                    error: e.message
                })

            }

        },

        logout: async (req, res) => {

            try {

                req.user.tokens.splice(0, req.user.tokens.length)
                await req.user.save()
                
                res.status(200).json({
                    name: 'Logout of system'
                })
                
            } catch (e) {
                
                res.status(500).json({
                    error: e.message || 'Not logout of system'
                })

            }

        }

    }
}
