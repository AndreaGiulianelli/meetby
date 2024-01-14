const jwtService = require("../services/jwtService")

exports.verify = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).send({ message: "No auth token provided" })
    }
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