const Notification = require('../models/notification')
const sockets = require('./sockets').sockets

async function pushNotificationToUsers(type, meetId, userIds, data, notificationDate) {
    try {
        const notification = new Notification({
            recipients: userIds,
            meetId: meetId,
            date: notificationDate,
            type: type,
            data: data,
            readers: [],
        })
        await notification.save()

        userIds.forEach(userId => {
            const socket = sockets.get(userId)
            if(socket) {
                socket.emit('notification', {
                    id: notification._id,
                    type: type,
                    meetId: meetId,
                    notificationDate: notificationDate,
                    data: data
                })
            }
        })
    } catch(error) {
        console.log(`Notification error: ${error}`)
    }
}


exports.pushNotification = async (type, meetId, userIds, guests, data) => {
    const notificationDate = new Date()
    if (userIds.length > 0) {
        await pushNotificationToUsers(type, meetId, userIds, data, notificationDate)
    }
}

exports.notificationTypes = {
    invitedMeet: "meet:invited",
    updateMeet: "meet:updated",
    deleteMeet: "meet:deleted",
    plannedMeet: "meet:planned"
}