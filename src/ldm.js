import { CatalogHelper } from '@gooddata/react-components';
import catalogJson from './catalog.json';
import destinationCodeElements from './destinationCodeElements.json'
const C = new CatalogHelper(catalogJson);

export const nameCache = {}
export const reverseNameCache = {}
export const destinationElementsCache = {}

destinationCodeElements.attributeElements.elements.forEach(el => {
    destinationElementsCache[el.title] = el.uri.replace(/^.*=/, '')
})

const defaults = {
    ['Normalised Carrier Delay Variability Score']: 'Delay Variability',
    ['Number of Flights(1)']: 'Number of Flights'
}

const metric = (name) => {
    const result = C.metric(name)
    nameCache[result] = defaults[name] || name
    reverseNameCache[nameCache[result]] = result
    return result
}

const attributeDisplayForm = (name) => {
    const result = C.attributeDisplayForm(name)
    nameCache[result] = name
    reverseNameCache[nameCache[result]] = result
    return result
}

export const NORM_DELAY_VAR_SCORE = metric('Normalised Carrier Delay Variability Score')
export const ON_TIME   = metric('On Time Flights')
export const DELAYED   = metric('Delayed Flights')
export const ON_TIME_PCT = metric('% On Time Flights')
export const CANCELLED_PCT = metric('% Cancelled Flights')
export const DELAYED_PCT = metric('% Delayed Flights')
export const TOTAL_FLIGHTS = metric('Number of Flights(1)')
export const DELAYED_OVER_15M = metric('Delayed Flights (15min+)')
export const DELAY_SCORE = metric('Carrier Delay Score')
export const CARRIER   = attributeDisplayForm('Carrier Name')
export const CAR_CODE  = attributeDisplayForm('Carrier')
export const FLIGHT_NO = attributeDisplayForm('Flight Number')