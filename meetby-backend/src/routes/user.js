const authJwtMiddleware = require('../middlewares/authJwtMiddleware')
const usersController = require('../controllers/userController')

module.exports = (app) => {
    app.route('/users')
        .get(authJwtMiddleware.verify, usersController.getUsers)
}
