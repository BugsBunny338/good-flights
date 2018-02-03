import t from './actionTypes'

export const setOrigin = (origin) => ({
    type: t.SET_ORIGIN,
    ...origin
});

export const setDestination = (destination) => ({
    type: t.SET_DESTINATION,
    ...destination
});

export const setCarrier = (carrier) => ({
    type: t.SET_CARRIER,
    ...carrier
});

export const setRoute = (origin, destination) => ({
    type: t.SET_ROUTE,
    origin, destination
});

export const setScheduledOrigin = (scheduledOrigin) => ({
    type: t.SET_SCHEDULED_ORIGIN,
    ...scheduledOrigin
});

export const setFlight = (carrier, flight) => {
    return {
        type: t.SET_FLIGHT,
        ...carrier,
        ...flight
    }
};

export const setReport = (report) => {
    return {
        type: t.SET_REPORT,
        ...report
    }
};

export const setSchedule = (schedule) => ({
    type: t.SET_SCHEDULE,
    ...schedule
});

export const setPages = (pages) => ({
    type: t.SET_PAGES,
    ...pages
});

export const setDestinations = (destinations) => ({
    type: t.SET_DESTINATIONS,
    ...destinations
});

export const resetData = () => ({
    type: t.RESET_DATA
});

export const setAttributeElements = (displayForm, attributeElements) => ({
    type: t.SET_ATTRIBUTE_ELEMENTS,
    displayForm,
    attributeElements
});

export const setUser = (user) => ({
    type: t.SET_USER,
    user
});

export const setCarrierCodesInSearchResult = (carrierCodesInSearchResult) => ({
    type: t.SET_CARRIER_CODES_IN_SEARCH_RESULT,
    carrierCodesInSearchResult
})