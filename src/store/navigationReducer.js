import actions from './actions';

/**
 * Redux date reducer
 */
export default function navigationReducer(state = { projectUri: '',
    ldmOptions: {includeDeprecated: false, includeNonProduction: false, includeGrain:false, excludeFactRule:false},
    ldmMarkup: '', ldmModel: {} }, action) {
    switch (action.type) {
        case actions.SET_PAGE:
            return {
                ...state,
                page: action.page
            };
        default:
            return state;
    }
}