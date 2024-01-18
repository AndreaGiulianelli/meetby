const Meet = require('../models/meet')

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
    if (!meet) {
        return
    }

    const feasibleDate = findFeasibleDate(meet)
    if (feasibleDate) {
        // feasible data found, plan meet
        await Meet.findByIdAndUpdate(meetId, { plannedDateTime: feasibleDate.split('/')[0] }, {runValidators: true})
    }
}