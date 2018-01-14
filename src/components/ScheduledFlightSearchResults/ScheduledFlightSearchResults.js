import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {connect} from 'react-redux';

import FlightAware from '../../flightapi/FlightAware';
import passwd from '../../passwd';
import actions from "../../store/actions";
import airports from "../../flightapi/airports";



class ScheduledFlightSearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.scheduleSelected = this.scheduleSelected.bind(this);
        this.retrieveScheduledFlights = this.retrieveScheduledFlights.bind(this);
    }

    scheduleSelected(schedule) {
        this.props.onScheduleSubmit({schedule});
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
                    let filtered = data.filter(d => airports[d.destination.substring(1)]).map( d =>
                    { return {...d, destination: d.destination.substring(1), origin: d.origin.substring(1)} });
                    _c.setState({data: filtered.map(d => {
                        return {...d, ident:<div onClick={(e) => _c.scheduleSelected(d)}>{d.ident}</div>}
                    })});
                    this.props.onDestinationsSubmit({destinations: filtered.map( r => r.destination)});
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
        onScheduleSubmit: (state) => {
            dispatch({type: actions.SET_SCHEDULE, schedule: state.schedule})
        },
        onDestinationsSubmit: (state) => {
            dispatch({type: actions.SET_DESTINATIONS, destinations: state.destinations})
        }
    }
}


function

mapStateToProps(state) {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ScheduledFlightSearchResults);