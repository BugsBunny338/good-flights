import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux'
import dataReducer from './dataReducer';
import navigationReducer from './navigationReducer';
import attributeElementsReducer from './attributeElementsReducer'
import userReducer from './userReducer'


/**
 * Redux root reducer
 */
const rootReducer = combineReducers({
    data: dataReducer,
    elements: attributeElementsReducer,
    navigation: navigationReducer,
    router: routerReducer,
    user: userReducer
});

export default rootReducer;