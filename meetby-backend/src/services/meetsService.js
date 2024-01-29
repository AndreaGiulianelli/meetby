const Meet = require('../models/meet')
const notificationService = require('../services/notificationService')

function findFeasibleDate(meet) {
    const partecipantsCount = meet.invitedUsers.length + meet.invitedGuests.length + 1 // +1 is the creator of the meet
    for (const proposedAvailability of meet.proposedAvailabilities) {
        const availablePartecipantsCount = proposedAvailability.availableUsers.length + proposedAvailability.availableGuests.length
        if (availablePartecipantsCount == partecipantsCount) {
            return proposedAvailability.availability
        }
    }
    return null
}

exports.checkAndPlan = async (meetId) => {
    const meet = await Meet.findById(meetId)
    if (!meet || meet.plannedDateTime) { // meet do not exist or already planned
        return false
    }

    const feasibleDate = findFeasibleDate(meet)
    if (feasibleDate) {
        // feasible data found, plan meet
        await Meet.findByIdAndUpdate(meetId, { plannedDateTime: feasibleDate.split('/')[0] }, {runValidators: true})
        
        const userToSendNotification = meet.invitedUsers.map(user => user.toHexString())
        userToSendNotification.push(meet.creator.toHexString())

        await notificationService.pushNotification(
            notificationService.notificationTypes.plannedMeet,
            meetId,
            userToSendNotification,
            meet.invitedGuests,
            {
                meetTitle: meet.title
            }
        )

        return true
    }
    return false
}