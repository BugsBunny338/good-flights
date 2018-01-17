import t from './actionTypes'

export const setOrigin = (origin) => ({
    type: t.SET_ORIGIN,
    ...origin
})

export const setDestination = (destination) => ({
    type: t.SET_DESTINATION,
    ...destination
})

export const setScheduledOrigin = (scheduledOrigin) => ({
    type: t.SET_SCHEDULED_ORIGIN,
    ...scheduledOrigin
})

export const setFlight = (flight) => ({
    type: t.SET_FLIGHT,
    ...flight
})

export const setSchedule = (schedule) => ({
    type: t.SET_SCHEDULE,
    ...schedule
})

export const setPages = (pages) => ({
    type: t.SET_PAGES,
    ...pages
})

export const setDestinations = (destinations) => ({
    type: t.SET_DESTINATIONS,
    ...destinations
})

export const resetData = () => ({
    type: t.RESET_DATA
})