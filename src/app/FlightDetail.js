import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

const FlightDetail = (airline, code) => {
  return <b>FlightDetail</b>
}

const mapStateToProps = (state, { params, location }) => {
    const query = new URLSearchParams(location.search)
    return {
        airline: query.get('airlineId'),
        code: query.get('codeId')
    }
}

export default withRouter(connect(mapStateToProps)(FlightDetail))