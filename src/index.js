import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory'
import { composeWithDevTools } from 'redux-devtools-extension';

import { Route } from 'react-router'

import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import './index.css';

import {Provider} from 'react-redux';
import rootReducer from './store/rootReducer'

import App from './app/App';
import Flights from './app/Flights'
import FlightDetail from './app/FlightDetail'

import Mumble from 'mumble-js'
import registerServiceWorker from './registerServiceWorker';

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(middleware)
    )
);

// TODO mumble:
// dispatch 
// SET_ORIGIN origin: {value: <attrElId>, label: <attrElName>}, SET_DESTINATION - destination: { ...}
//  

const mumble = new Mumble({
    language: 'en-US',
    debug: false, // set to true to get some detailed information about what's going on
 
    // define some commands using regex or a simple string for exact matching
    commands: [{
        name: 'routes_from_to',
        command: /^find routes from (...) to (...)$/,
 
        action: (origin, destination) => {
          console.log('routes from %s to %s', origin, destination)
          // store.dispatch(numberOfFlightsFromTo(origin, destination))
        }
    }, {
        name: 'find_flights_from',
        command: /^find flights from (...)$/,
 
        action: (origin) => {
            console.log('flights from %s', origin);
            // store.dispatch(numberOfFlightsFromOrTo(direction, code))
        }
    }],
    // define global callbacks (see docs for all)
    callbacks: {
        start: function(event) {
            console.log('Starting..');
        }
 
        // start, end, speech, recognizeMatch, etc
    }
})
mumble.start();

ReactDOM.render(
    <Provider store = {store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" component={App} />
            <Route path="/flights" component={Flights} /> {/* URL params originId/destinationId */}
            <Route path="/flight" component={FlightDetail} /> {/* URL params airlineId/codeId */}
          </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker();
