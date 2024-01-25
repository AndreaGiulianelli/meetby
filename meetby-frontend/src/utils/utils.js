import { parse, toSeconds } from 'iso8601-duration'

export function getMeetStatus(meet) {
    if (meet.plannedDateTime) {
        if (new Date(meet.plannedDateTime).getTime() < new Date().getTime()) {
            return 'Concluded'
        } else {
            return 'Planned'
        }
    } else {
        return 'Planning'
    }
}

export function getDurationUnit(duration) {
    return duration.slice(-1) == 'M' ? 'min' : 'hour'
}

export function getDurationValue(duration) {
    return toSeconds(parse(duration)) / (duration.slice(-1) == 'M' ? 60 : 3600)
}

export function getEndDate(startDate, isoDuration) {
    const endDate = new Date(startDate.getTime())
    endDate.setSeconds(endDate.getSeconds() + toSeconds(parse(isoDuration)))
    return endDate
}
