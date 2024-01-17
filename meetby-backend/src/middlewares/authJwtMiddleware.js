const jwtService = require("../services/jwtService")

function verifyToken(token, req, res, next) {
    jwtService
        .verifyToken(token)
        .then(result => {
            if (result.authenticated) {
                req.userId = result.userId
                next()
            } else {
                return res.status(401).send()
            }
        })
        .catch(_ => {
            return res.status(500).send()
        })
}

exports.verify = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).send({ message: "No auth token provided" })
    }
    verifyToken(token, req, res, next)
}

exports.verifyOrGuest = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        verifyToken(token, req, res, next)
    } else {
        if(!req.query.guest) {
            return res.status(401).json({ message: "No auth token and no guest data is provided" })
        }
        req.guestEmail = req.query.guest
        next()
    }
}
