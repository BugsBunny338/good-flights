import React from 'react';

import actions from './actionTypes';
import FlightSearchPage from '../pages/FlightSearchPage';
//import LoginPage from '../pages/LoginPage';


/**
 * Redux date reducer
 */
export default function navigationReducer(state = { pages : [{ page:<FlightSearchPage/>, breadcrumb:'Routes'}] }, action) {
//export default function navigationReducer(state = { pages : [{ page:<LoginPage/>, breadcrumb:'Login'}] }, action) {
    switch (action.type) {
        case actions.SET_PAGES:
            return {
                ...state,
                pages: action.pages
            };
        default:
            return state;
    }
}