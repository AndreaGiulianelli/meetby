export function getDisplayDateTime(datetime) {
    const dateAndTime = datetime.split('T')
    return dateAndTime[0] + ' @ ' + dateAndTime[1]
}

export function getMeetStatus(meet) {
    if (meet.plannedDateTime) {
        if (new Date(meet.plannedDateTime).getTime() > new Date().getTime()) {
            return 'Concluded'
        } else {
            return 'Planned'
        }
    } else {
        return 'Planning'
    }
}
