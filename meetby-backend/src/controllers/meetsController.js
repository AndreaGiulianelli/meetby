const mongoose = require('mongoose')
const Meet = require('../models/meet')
const User = require('../models/user')
const { asyncController } = require('./utils/asyncController')


exports.createNewMeet = asyncController(async (req, res) => {
    if (req.body.invitedUsers) {
        req.body.invitedUsers.forEach(async invitedUserId => {
            if (!await User.findById(invitedUserId)) {
                return res.status(400).json({ message: "Invalid data provided" })
            }
        });
    }

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
            creationDate: new Date()
        })
        await meet.save()
        return res.status(201).send()
    } catch(err) {
        return res.status(400).json({ message: "Invalid data provided" })
    }
})

exports.updateMeet = asyncController(async (req, res) => {
    if (req.body.invitedUsers) {
        req.body.invitedUsers.forEach(async invitedUserId => {
            if (!await User.findById(invitedUserId)) {
                return res.status(400).json({ message: "Invalid data provided" })
            }
        });
    }

    const oldMeet = Meet.findById(req.params.meetId)
    if (!oldMeet) {
        return res.status(404).send()
    }
    if (oldMeet.plannedDateTime) {
        return res.status(409).json({ message: "It is not possible to update a planned meet" })
    }

    try {
        await Meet.findByIdAndUpdate(req.params.meetId, {
            title: req.body.title,
            duration: req.body.duration,
            creator: req.userId,
            place: req.body.place,
            description: req.body.description,
            meetingUrl: req.body.meetingUrl,
            proposedAvailabilities: (req.body.proposedAvailabilities) ? req.body.proposedAvailabilities.map(a => ({ availability: a })) : undefined, // after update each one should reset their availabilities
            invitedUsers: req.body.invitedUsers,
            invitedGuests: req.body.invitedGuests,
        }, {runValidators: true} )
        return res.status(204).send()
    } catch(err) {
        return res.status(400).json({ message: "Invalid data provided" })
    }
})

exports.getAllMeets = asyncController(async (req, res) => {
    const query = { 
        $or: [
            { creator: new mongoose.Types.ObjectId(req.userId) },
            { invitedUsers: new mongoose.Types.ObjectId(req.userId) }
        ],
    }

    if (req.query.status == "planned") {
        query.plannedDateTime = { $ne: null }
    } else if (req.query.status == "planning") {
        query.plannedDateTime = { $exists: false }
    }

    const pipeline = [
        {
            $match: query,
        },
        {
            $lookup: {
                from: 'users',
                localField: 'creator',
                foreignField: '_id',
                as: 'meetCreator'
            }
        },
        {
            $project: {
                'meetCreator._id': 1,
                'meetCreator.name': 1,
                'meetCreator.surname': 1,
                'title': 1,
                'invitedUsers': 1,
                'invitedGuests': 1,
                'creationDate': 1,
                'plannedDateTime': 1,
            }
        }
    ]

    const meets = await Meet.aggregate(pipeline).sort({ creationDate: -1 })

    if (meets.lenght == 0) {
        return res.status(204).send()
    }

    return res.status(200).json(meets)
})
