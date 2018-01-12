import {combineReducers} from 'redux';
import dataReducer from './dataReducer';
import navigationReducer from "./navigationReducer";

/**
 * Redux root reducer
 */
const rootReducer = combineReducers({
    data: dataReducer,
    navigation: navigationReducer
});

export default rootReducer;