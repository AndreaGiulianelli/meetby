const Meet = require('../models/meet')
const User = require('../models/user')
const { asyncController } = require('./utils/asyncController')


exports.createNewMeet = asyncController(async (req, res) => {
    if (!req.body.invitedUsers) {
        return res.status(400).json({ message: "Invalid data provided" })
    }
    
    req.body.invitedUsers.forEach(async invitedUserId => {
        if (!await User.findById(invitedUserId)) {
            return res.status(400).json({ message: "Invalid data provided" })
        }
    });

    try {
        const meet = new Meet({
            title: req.body.title,
            duration: req.body.duration,
            creator: req.userId,
            place: req.body.place,
            description: req.body.description,
            meetingUrl: req.body.meetingUrl,
            proposedAvailabilities: req.body.proposedAvailabilities.map(a => ({ availability: a })),
            invitedUsers: req.body.invitedUsers,
            invitedGuests: req.body.invitedGuests,
        })
        await meet.save()
        return res.status(201).send()
    } catch(err) {
        return res.status(400).json({ message: "Invalid data provided" })
    }
})