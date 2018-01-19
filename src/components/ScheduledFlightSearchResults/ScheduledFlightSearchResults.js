import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import moment from 'moment';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {connect} from 'react-redux';


import ScheduledFlightDetailPanel from '../ScheduledFlightDetailPanel/ScheduledFlightDetailPanel';

import FlightAware from '../../flightapi/FlightAware';
import passwd from '../../passwd';
import predict from '../../ai/model';
import {setOrigin, setDestinations, setPages, setSchedule} from "../../store/actions";
import airports from "../../flightapi/airports";

import getFlightWeather from '../../weather/FlightWeather';

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
                        };
                    }).map(d => { // second map is needed as the origin and destination aren't modified (stripped K)

                        let n = {
                            ...d,
                            link: <a href="" onClick={(e) => _c.scheduleSelected(e, d)}>{d.ident}</a>,
                        };
                        getFlightWeather(n.origin, n.destination, n.filed_departuretime, n.estimatedarrivaltime, (w) => {
                            n.originWeather = w.originWeather;
                            n.destinationWeather =   w.destinationWeather;
                            let inputData = {
                                "crs_dep_time_bucket": "M",
                                "dest_precipitation_3h": 1,
                                "duration_bucket": "L",
                                "crs_arr_time_bucket": "e",
                                "dest_pressure": n.destinationWeather.main.sea_level,
                                "dest_air_temp": n.destinationWeather.main.temp,
                                "dest_wind_speed": n.destinationWeather.wind.speed,
                                "dest_wind_dir": n.destinationWeather.wind.deg,
                                "origin_precipitation_3h": 1,
                                "origin_wind_dir": n.originWeather.wind.deg,
                                "origin_wind_speed": n.originWeather.wind.speed,
                                "origin_air_temp": n.originWeather.main.temp,
                                "origin_pressure": n.originWeather.main.sea_level,
                                "dest_size": "XXL",
                                "dest_state": "CA",
                                "dep_date_holidays": "C",
                                "dest": n.destination,
                                "origin_state": "CA",
                                "carrier": n.ident.substring(0,3),
                                "origin": n.origin,
                                "dep_month": "AUG",
                                "dep_day_of_week": "THU",
                                "arr_date_holidays": "C",
                                "origin_size": "XXL"
                            };
                            n.predictedDelay = `${Math.round(predict(inputData))}m`;
                            _c.setState({delayPredicted: Math.random()});
                        });
                        return n;
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
        return (<Container fluid={true} className="selected-results">
            <Row>
            <Col xs={12} className="select-title">RESULT</Col>
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
                            {
                                Header: "Est. Delay",
                                accessor: "predictedDelay"
                            }

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

const mapDispatchToProps = {
    onOriginSubmit: setOrigin,
    onDestinationsSubmit: setDestinations,
    onScheduleSubmit: setSchedule,
    onPagesSubmit: setPages
};


function mapStateToProps(state) {
    return {
        data: state.data,
        navigation: state.navigation
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduledFlightSearchResults);