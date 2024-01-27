const mongoose = require('mongoose')
const User = require('../models/user')
const Notification = require('../models/notification')
const { asyncController } = require('./utils/asyncController')

exports.getUsers = asyncController(async (req, res) => {
    if (!req.query.startsWith) {
        return res.status(400).json({ message: "Provide the 'startsWith' query parameter to perform the request" })
    }

    const userRegex = new RegExp("^" + req.query.startsWith.toLowerCase(), "i")
    const pipeline = [
        {
            $match: {
                $or: [
                    { name: userRegex },
                    { surname: userRegex },
                    { username: userRegex }
                ]
            },
        },
        {
            $project: {
                name: 1,
                surname: 1,
                username: 1,
            }
        }
    ]
    const users = await User.aggregate(pipeline).sort({ username: 1 })

    if (users.length == 0) {
        return res.status(204).send()
    }

    return res.status(200).json(users)
})

exports.getAllNotifications = asyncController(async (req, res) => {
    const notifications = await Notification.find({ recipients: new mongoose.Types.ObjectId(req.userId) }).sort({ date: -1 })

    if (notifications && notifications.length != 0) {
        const notificationsDto = notifications.map(notification => { return {
            id: notification._id,
            type: notification.type,
            meetId: notification.meetId,
            date: notification.date,
            data: notification.data,
            read: notification.readers.includes(req.userId)
        }})
        return res.status(200).json(notificationsDto)
    } else {
        return res.sendStatus(204)
    }
})

exports.markNotificationAsRead = asyncController(async (req, res) => {
    const notification = await Notification.findOneAndUpdate(
        {
            _id: req.params.notificationId,
            recipients: new mongoose.Types.ObjectId(req.userId),
        }, 
        {
            $addToSet: {
                readers: req.userId
            }
        }, 
        {runValidators: true}
    )

    if (!notification) {
        return res.sendStatus(404)
    } else {
        return res.sendStatus(204)
    }
})
