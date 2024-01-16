const Meet = require('../models/meet')

exports.isMeetCreator = (req, res, next) => {
    Meet.findById(req.params.meetId).then((meet) => {
        if (!meet) {
            return res.status(404).send()
        }
        if (meet.creator != req.userId) {
            return res.status(401).json({ message: "You are not the creator of the meet" })
        }
        next()
    })
}