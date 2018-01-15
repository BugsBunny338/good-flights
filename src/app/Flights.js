import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import OriginToDestinationScatterPlot from '../components/FlightDetailPanel/OriginToDestinationScatterPlot'

const Flights = ({ originId, destinationId }) => {
  return <div>
      <b>Flights</b>
      <OriginToDestinationScatterPlot originId={originId} destinationId={destinationId} />
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