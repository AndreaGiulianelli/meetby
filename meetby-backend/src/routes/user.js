const authJwtMiddleware = require('../middlewares/authJwtMiddleware')
const usersController = require('../controllers/userController')

module.exports = (app) => {
    app.route('/users')
        .get(authJwtMiddleware.verify, usersController.getUsers)
    
    app.route('/user/notifications')
        .get(authJwtMiddleware.verify, usersController.getAllNotifications)
    
    app.route('/user/notifications/:notificationId')
        .put(authJwtMiddleware.verify, usersController.markNotificationAsRead)
}
