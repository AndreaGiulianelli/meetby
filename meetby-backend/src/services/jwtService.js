const jwt = require('jsonwebtoken')

const jwtSecretKey = process.env.JWT_SECRET_KEY

exports.verifyToken = (token) => {
    return new Promise((resolve, _) => {
        jwt.verify(token, jwtSecretKey, (err, decoded) => {
            if (err) {
                resolve({
                    authenticated: false
                })
            } else {
                resolve({
                    authenticated: true,
                    userId: decoded.id,
                })
            }
        })
    })
}

exports.generateToken = (userId) => {
    return jwt.sign({id: userId}, jwtSecretKey, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 1 day
    })
}