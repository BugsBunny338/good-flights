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

import registerServiceWorker from './registerServiceWorker';

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(middleware)
    )
);

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
