const authJwtMiddleare = require('../middlewares/authJwtMiddleware')
const authJwtController = require('../controllers/authController')
const meetsController = require('../controllers/meetsController')

module.exports = (app) => {
    app.route('/signup')
        .post(authJwtController.signup)

    app.route('/login')
        .post(authJwtController.login)

    // TODO: TO DELETE
    app.route('/meets')
        .post(authJwtMiddleare.verify, meetsController.createNewMeet)

}