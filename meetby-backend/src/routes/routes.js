const authJwtMiddleare = require('../middlewares/authJwtMiddleware')
const meetMiddleare = require('../middlewares/meetMiddleware')
const authJwtController = require('../controllers/authController')
const meetsController = require('../controllers/meetsController')

module.exports = (app) => {
    app.route('/signup')
        .post(authJwtController.signup)

    app.route('/login')
        .post(authJwtController.login)

    app.route('/meets')
        .get(authJwtMiddleare.verify, meetsController.getAllMeets)
        .post(authJwtMiddleare.verify, meetsController.createNewMeet)

    app.route('/meets/:meetId')
        .get(meetsController.getMeet)
        .put([ authJwtMiddleare.verify, meetMiddleare.isMeetCreator ], meetsController.updateMeet)

}