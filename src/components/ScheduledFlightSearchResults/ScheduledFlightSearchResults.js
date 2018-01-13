import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {connect} from 'react-redux';

import FlightAware from '../../flightapi/FlightAware';
import passwd from '../../passwd';
import actions from "../../store/actions";


class ScheduledFlightSearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.flightSelected = this.flightSelected.bind(this);
        this.retrieveScheduledFlights = this.retrieveScheduledFlights.bind(this);
    }

    flightSelected(flight) {
        this.props.onFlightSubmit({flight: flight});
    }

    retrieveScheduledFlights(origin, callback) {
        if(origin) {
            let f = new FlightAware();
            f.setCredentials(passwd.flightAwareApiUser, passwd.flightAwareApiKey);
            f.Scheduled({airport: origin.label, filter: 'airline'}, (err, r) => {
                callback(r.scheduled, err);
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        let _c = this;
        if (nextProps.data.scheduledOrigin && (!this.props.data || !this.props.data.scheduledOrigin || nextProps.data.scheduledOrigin !== this.props.data.scheduledOrigin)) {
            this.retrieveScheduledFlights(nextProps.data.scheduledOrigin, (data, err) => {
                if (err) {
                    console.log(`ScheduledFlightSearchResults: FLight API ERROR: '${JSON.stringify(err, null, 2)}'`);
                }
                else {
                    _c.setState({data});
                }
            });
        }
    }

    render() {
        let _c = this;
        return (<Container fluid={true}>
            <Row>
                <Col xs={12}>
                    {this.props.data.scheduledOrigin && <ReactTable
                        data={_c.state.data}
                        columns={[
                            {
                                Header: "Flight #",
                                accessor: "ident"
                            },
                            {
                                Header: "Destination",
                                accessor: "destination"
                            },
                            {
                                Header: "Departure",
                                accessor: "filed_departuretime"
                            },
                            {
                                Header: "Arrival",
                                accessor: "estimatedarrivaltime"
                            },

                        ]}
                        defaultPageSize={10}
                        showPageSizeOptions={false}
                        className="-striped -highlight"
                    />}
                </Col>
            </Row>
        </Container>);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onFlightSubmit: (state) => {
            dispatch({type: actions.SET_FLIGHT, flight: state.flight})
        }
    }
}


function

mapStateToProps(state) {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)

(
    ScheduledFlightSearchResults
)
;