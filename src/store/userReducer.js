import actions from './actionTypes';

const DEFAULT_STATE = {user: {}};

/**
 * Redux user reducer
 */
export default function userReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case actions.SET_USER:
            return {
                ...state,
                ...action.user
            };
        default:
            return state;
    }
}