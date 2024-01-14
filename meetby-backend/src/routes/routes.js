const authJwtController = require('../controllers/authController')
const authJwtMiddleare = require('../middlewares/authJwtMiddleware')

module.exports = (app) => {
    app.route('/signup')
        .post(authJwtController.signup)

    app.route('/login')
        .post(authJwtController.login)

    // TODO: TO DELETE
    app.route('/test')
        .get(authJwtMiddleare.verify, (req, res) => { res.status(200).json({userId: req.userId}) })

}