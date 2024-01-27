const mongoose = require('mongoose')
const Message = require('../models/message')
const User = require('../models/user')
const Meet = require('../models/meet')
const { asyncController } = require('./utils/asyncController')
const sockets = require('../services/sockets').sockets
const notificationService = require('../services/notificationService')


exports.getMeetChat = asyncController(async (req, res) => {
    const pipeline = [
        {
            $match: {
                meetId: new mongoose.Types.ObjectId(req.params.meetId)
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'sender',
                foreignField: '_id',
                as: 'sender'
            }
        },
        {
            $project: {
                'sender._id': 1,
                'sender.name': 1,
                'sender.surname': 1,
                'sender.username': 1,
                'meetId': 1,
                'date': 1,
                'message': 1,
            }
        },
        {
            $unwind: "$sender"
        }
    ]

    const messages = await Message.aggregate(pipeline)

    if (messages.length == 0) {
        return res.sendStatus(204)
    }

    return res.status(200).json(messages)
})


exports.sendNewMessage = async (io, senderSocket, message) => {
    try {
        const meet = await Meet.findById(message.meetId)
        if (meet.creator != senderSocket.userId && !meet.invitedUsers.includes(senderSocket.userId)) {
            return
        }

        const newMessage = new Message({
            sender: senderSocket.userId,
            meetId: message.meetId,
            date: new Date(message.date),
            message: message.message,
        })
        await newMessage.save()
    
        const userToSendMessage = meet.invitedUsers.map(user => user.toHexString())
        userToSendMessage.push(meet.creator.toHexString())

        const sender = await User.findById(newMessage.sender)

        const messageToSend = {
            id: newMessage._id,
            sender: {
                id: newMessage.sender,
                name: sender.name,
                surname: sender.surname,
                username: sender.username,
            },
            meetId: newMessage.meetId,
            date: newMessage.date,
            message: newMessage.message
        }

        io.emit('message:new', messageToSend) // confirm message to sender
        // send message to other invited users listening
        const deliveredMessageUser = [senderSocket.userId]
        userToSendMessage.forEach(userId => {
            const socket = sockets.get(userId)
            if (socket) {
                deliveredMessageUser.push(userId)
                socket.emit('message:new', messageToSend)
            }
        })

        // send notification to everyone else
        const userToSendNotification = userToSendMessage.filter(user => !deliveredMessageUser.includes(user))
        await notificationService.pushNotification(
            notificationService.notificationTypes.newMessage,
            newMessage.meetId,
            userToSendNotification,
            [],
            {
                meetTitle: meet.title
            }
        )
    } catch(err) {
        console.log(err)
    }
}