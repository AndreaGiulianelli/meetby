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

exports.isMeetInPlanning = (req, res, next) => {
    Meet.findById(req.params.meetId).then((meet) => {
        if (!meet) {
            return res.status(404).send()
        }
        if (meet.plannedDateTime) {
            return res.status(409).json({ message: "The meet is not in planning" })
        }
        next()
    })
}

exports.isMeetNotConcluded = (req, res, next) => {
    Meet.findById(req.params.meetId).then((meet) => {
        if (!meet) {
            return res.status(404).send()
        }
        if (meet.plannedDateTime && new Date(meet.plannedDateTime).getTime() < new Date().getTime() ) {
            return res.status(409).json({ message: "The meeting is already over" })
        }
        next()
    })
}
