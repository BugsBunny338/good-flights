import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import OriginToDestinationScatterPlot from '../components/FlightDetailPanel/OriginToDestinationScatterPlot'
import QualityRadarChart from '../components/QualityRadarChart'

const Flights = ({ originId, destinationId }) => {
  return <div>
      <b>Flights</b>
      <OriginToDestinationScatterPlot originId={originId} destinationId={destinationId} onPointClick={alert} />
      <QualityRadarChart originId={originId} destinationId={destinationId} onPointClick={alert} />
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