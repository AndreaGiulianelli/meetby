const authJwtMiddleware = require('../middlewares/authJwtMiddleware')
const meetMiddleware = require('../middlewares/meetMiddleware')
const meetsController = require('../controllers/meetsController')
const chatController = require('../controllers/chatController')

module.exports = (app) => {
    app.route('/meets')
        .get(authJwtMiddleware.verify, meetsController.getAllMeets)
        .post(authJwtMiddleware.verify, meetsController.createNewMeet)

    app.route('/meets/:meetId')
        .get(
            [
                authJwtMiddleware.verifyOrGuest,
                meetMiddleware.isInvited
            ],
            meetsController.getMeet
        )
        .put(
            [ 
                authJwtMiddleware.verify,
                meetMiddleware.isMeetCreator, 
                meetMiddleware.isMeetInPlanning 
            ],
            meetsController.updateMeet
        )
        .delete(
            [
                authJwtMiddleware.verify,
                meetMiddleware.isMeetCreator,
                meetMiddleware.isMeetNotConcluded
            ],
            meetsController.deleteMeet
        )

    app.route('/meets/:meetId/availabilities')
        .put(
            [
                authJwtMiddleware.verifyOrGuest,
                meetMiddleware.isInvited,
                meetMiddleware.isMeetInPlanning
            ],
            meetsController.setPersonalAvailabilities
        )

    app.route('/meets/:meetId/partecipations')
        .delete(
            [
                authJwtMiddleware.verifyOrGuest,
                meetMiddleware.isInvited,
                meetMiddleware.isMeetNotConcluded
            ],
            meetsController.leaveMeet
        )
    
    app.route('/meets/:meetId/chat')
        .get(
            [
                authJwtMiddleware.verify,
                meetMiddleware.isInvited
            ],
            chatController.getMeetChat
        )
}
