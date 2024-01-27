const chatController = require('../controllers/chatController')

module.exports = (io, socket) => {
    socket.on('message:new', (message) => {
        chatController.sendNewMessage(io, socket, JSON.parse(message))
    })
}