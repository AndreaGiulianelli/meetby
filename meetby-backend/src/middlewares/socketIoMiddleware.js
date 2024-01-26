const jwtService = require("../services/jwtService")

exports.verify = (socket, next) => {
    const token = socket.handshake.auth.token
    if (!token) {
        next(new Error('No auth token provided'))
    } else {
        jwtService
            .verifyToken(token)
            .then(result => {
                if (result.authenticated) {
                    socket.userId = result.userId
                    next()
                } else {
                    next(new Error('Invalid token'))
                }
            })
            .catch(_ => {
                next(new Error('Server error during authentication'))
            })
    }
}
