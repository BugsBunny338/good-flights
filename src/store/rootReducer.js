import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux'
import dataReducer from './dataReducer';
import navigationReducer from './navigationReducer';
import attributeElementsReducer from './attributeElementsReducer'

/**
 * Redux root reducer
 */
const rootReducer = combineReducers({
    data: dataReducer,
    elements: attributeElementsReducer,
    navigation: navigationReducer,
    router: routerReducer
});

export default rootReducer;