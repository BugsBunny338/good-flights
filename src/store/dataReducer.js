import actions from './actions';

/**
 * Redux date reducer
 */
export default function dataReducer(state = { }, action) {
    switch (action.type) {
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
        case actions.SET_FLIGHT:
            return {
                ...state,
                flight: action.flight
            };
        default:
            return state;
    }
}