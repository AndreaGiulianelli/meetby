const authJwtController = require('../controllers/authController')

module.exports = (app) => {
    app.route('/signup')
        .post(authJwtController.signup)

    app.route('/login')
        .post(authJwtController.login)
}
