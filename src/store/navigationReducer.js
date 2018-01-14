import React from 'react';

import actions from './actions';
import FlightSearchPage from '../pages/FlightSearchPage';

/**
 * Redux date reducer
 */
export default function navigationReducer(state = { pages : [{ page:<FlightSearchPage/>, breadcrumb:'Routes'}] }, action) {
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