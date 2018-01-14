import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import moment from 'moment';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {connect} from 'react-redux';


import ScheduledFlightDetailPanel from '../ScheduledFlightDetailPanel/ScheduledFlightDetailPanel';

import FlightAware from '../../flightapi/FlightAware';
import passwd from '../../passwd';
import actions from "../../store/actions";
import airports from "../../flightapi/airports";

class ScheduledFlightSearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.scheduleSelected = this.scheduleSelected.bind(this);
        this.getScheduledFlights = this.getScheduledFlights.bind(this);
    }

    scheduleSelected(e, schedule) {
        this.props.onPagesSubmit({
            pages: [this.props.navigation.pages[0], this.props.navigation.pages[1],
                {page: <ScheduledFlightDetailPanel/>, breadcrumb: 'Detail'}]
        });
        this.props.onScheduleSubmit({schedule});
        e.preventDefault();
    }

    getScheduledFlights(props) {
        let _c = this;
        if (props.data && props.data.scheduledOrigin) {
            let f = new FlightAware();
            f.setCredentials(passwd.flightAwareApiUser, passwd.flightAwareApiKey);
            f.Scheduled({airport: props.data.scheduledOrigin.label, filter: 'airline'}, (err, r) => {
                if (err) {
                    console.log(`ScheduledFlightSearchResults: FLight API ERROR: '${JSON.stringify(err, null, 2)}'`);
                }
                else {
                    let filtered = r.scheduled.filter(d => airports[d.destination.substring(1)]).map(d => {
                        return {
                            ...d,
                            destination: d.destination.substring(1),
                            origin: d.origin.substring(1),
                            link: <a href="" onClick={(e) => _c.scheduleSelected(e, d)}>{d.ident}</a>,
                            departuretime: moment.unix(d.filed_departuretime).format('HH:mm'),
                            arrivaltime: moment.unix(d.estimatedarrivaltime).format('HH:mm')
                        }
                    }).map(d => { // second map is needed as the origin and destination aren't modified (stripped K)
                        return {
                            ...d,
                            link: <a href="" onClick={(e) => _c.scheduleSelected(e, d)}>{d.ident}</a>,
                        }
                    });
                    _c.setState({data: filtered});
                    this.props.onDestinationsSubmit({destinations: filtered});
                }
            });
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.data.scheduledOrigin && (!this.props.data || !this.props.data.scheduledOrigin ||
                nextProps.data.scheduledOrigin !== this.props.data.scheduledOrigin)) {
            this.getScheduledFlights(nextProps);
        }
    }

    componentDidMount() {
        if (this.props.data && this.props.data.scheduledOrigin) {
            this.getScheduledFlights(this.props);
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
                                accessor: "link"
                            },
                            {
                                Header: "Destination",
                                accessor: "destination"
                            },
                            {
                                Header: "Departure",
                                accessor: "departuretime"
                            },
                            {
                                Header: "Arrival",
                                accessor: "arrivaltime"
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
        },
        onPagesSubmit: (state) => {
            dispatch({type: actions.SET_PAGES, pages: state.pages})
        }
    }
}


function mapStateToProps(state) {
    return {
        data: state.data,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduledFlightSearchResults);