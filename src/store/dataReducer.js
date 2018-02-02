import actions from './actionTypes';

const DEFAULT_STATE = { report: {value: 1894, label: 'On Time Benchmark' }};

/**
 * Redux date reducer
 */
export default function dataReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case actions.SET_ROUTE:
            return {
                ...state,
                origin: action.origin,
                destination: action.destination
            }
        case actions.SET_ORIGIN:
            return {
                ...state,
                origin: action.origin
            };
        case actions.SET_SCHEDULED_ORIGIN:
            return {
                ...state,
                scheduledOrigin: action.scheduledOrigin
            };
        case actions.SET_DESTINATION:
            return {
                ...state,
                destination: action.destination
            };
        case actions.SET_CARRIER:
            return {
                ...state,
                carrierSearch: action.carrier
            };
        case actions.SET_DESTINATIONS:
            return {
                ...state,
                destinations: action.destinations
            };
        case actions.SET_FLIGHT:
            return {
                ...state,
                carrier: action.carrier,
                flight: action.flight
            };
        case actions.SET_SCHEDULE:
            return {
                ...state,
                schedule: action.schedule
            };
        case actions.SET_REPORT:
            return {
                ...state,
                report: action.report
            };
        case actions.RESET_DATA:
            return {
                ...DEFAULT_STATE
            };
        default:
            return state;
    }
}