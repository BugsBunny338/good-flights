import actions from './actionTypes';

export default function attributeElementsReducer(state = {}, action) {
    if (action.type === actions.SET_ATTRIBUTE_ELEMENTS) {
        if (!action.attributeElements || !action.displayForm) {
            console.error('attributeElementsReducer: SET_ATTRIBUTE_ELEMENTS without displayForm and attributeElements')
            return state
        }
        const reverseCache = {}
        action.attributeElements.forEach((element) => {
            reverseCache[element.label] = element.value
        })
        return {
            ...state,
            [action.displayForm]: reverseCache
        }
    }
    return state
}