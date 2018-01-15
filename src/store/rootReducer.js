import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux'
import dataReducer from './dataReducer';
import navigationReducer from "./navigationReducer";

/**
 * Redux root reducer
 */
const rootReducer = combineReducers({
    data: dataReducer,
    navigation: navigationReducer,
    router: routerReducer
});

export default rootReducer;