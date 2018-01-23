import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import OriginToDestinationScatterPlot from '../components/FlightDetailPanel/OriginToDestinationScatterPlot'
import QualityRadarChart from '../components/QualityRadarChart'
import GaugeWrapper from '../components/GaugeWrapper'

const gaugeOptions = {
  angle: 0.25,
  lineWidth: 0.2,
  pointer: {
    length: 0.6,
    strokeWidth: 0.05,
    color: '#000000'
  },
  staticZones: [
     {strokeStyle: "#30B32D", min: 0, max: 15},
     {strokeStyle: "#FFDD00", min: 15, max: 60},
     {strokeStyle: "#F03E3E", min: 60, max: 120}
  ],
  limitMax: false,
  limitMin: false,
  strokeColor: '#E0E0E0',
  highDpiSupport: true
};


const Flights = ({ originId, destinationId }) => {
  return <div>
      <b>Flights</b>
      <OriginToDestinationScatterPlot originId={originId} destinationId={destinationId} onPointClick={alert} />
      <QualityRadarChart originId={originId} destinationId={destinationId} onPointClick={alert} />
      <GaugeWrapper width="200" height="150" max={120} value={1000} options={gaugeOptions} />
  </div>
}

const mapStateToProps = (state, { params, location }) => {
    const query = new URLSearchParams(location.search)
    return {
        originId: query.get('originId'),
        destinationId: query.get('destinationId')
    }
}

export default withRouter(connect(mapStateToProps)(Flights))