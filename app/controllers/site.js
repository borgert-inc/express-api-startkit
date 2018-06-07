
module.exports = (app) => {
    return {

        home: async (req, res) => {

            try {

                res.render('home')

            } catch (e) {

                app.helpers.logger.log({
                    date: new Date(),
                    level: 'error',
                    message: e.message,
                    filename: __filename
                })

                req.flash('error', e.message)

                res.status(500).render('error', { error: e })

            }

        }

    }
}
