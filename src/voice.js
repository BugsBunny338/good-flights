import React from 'react'

import Mumble from 'mumble-js'
import { setRoute, setPages } from './store/actions'
import {CatalogHelper} from '@gooddata/react-components';
import MapPanel from './components/MapPanel/MapPanel';

import catalogJson from './catalog.json';

const C = new CatalogHelper(catalogJson);

const displayForm = C.attributeDisplayForm('Origin IATA Code')

export default function setupVoice(store) {
    const airportCodeElement = (codeInput) => {
        const code = codeInput.toUpperCase()
        const elementId = store.getState().elements[displayForm][code]
        if (!elementId) {
            throw new Error("Invalid airport code " + code);
        }
        return {
            label: code,
            value: elementId
        }
    }

    const navigateAndDispatchAction = (action) => {
        store.dispatch(
            setPages({
                pages:[
                  store.getState().navigation.pages[0],
                  { page: <MapPanel/>, breadcrumb: 'Map' }
                ]
            })
        );
        store.dispatch(action)
    }

    const mumble = new Mumble({
      language: 'en-US',
      debug: false, // set to true to get some detailed information about what's going on
   
      // define some commands using regex or a simple string for exact matching
      commands: [{
          name: 'routes_from_to',
          command: /find routes from (...) to (...)$/,
   
          action: (origin, destination) => {
            console.log('routes from %s to %s', origin, destination)
            navigateAndDispatchAction(setRoute(
                airportCodeElement(origin),
                airportCodeElement(destination)))
          }
      }, /* I'm not risking this with the Redux state based navigation {
          name: 'find_flights_from',
          command: /find flights from (...)$/,
   
          action: (origin) => {
              console.log('flights from %s', origin);
              navigateAndDispatchAction(setOrigin(airportCodeElement(origin))) // this won't work!
          }
      } */],
      // define global callbacks (see docs for all)
      callbacks: {
          start: function(event) {
              console.log('Starting..');
          }
   
          // start, end, speech, recognizeMatch, etc
      }
  })

  mumble.start();
}
