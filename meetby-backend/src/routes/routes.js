const authJwtMiddleare = require('../middlewares/authJwtMiddleware')
const meetCreatorMiddleare = require('../middlewares/meetCreatorMiddleware')
const authJwtController = require('../controllers/authController')
const meetsController = require('../controllers/meetsController')

module.exports = (app) => {
    app.route('/signup')
        .post(authJwtController.signup)

    app.route('/login')
        .post(authJwtController.login)

    app.route('/meets')
        .post(authJwtMiddleare.verify, meetsController.createNewMeet)

    app.route('/meets/:meetId')
        .put([ authJwtMiddleare.verify, meetCreatorMiddleare.isMeetCreator ], meetsController.updateMeet)

}