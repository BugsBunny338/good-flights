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
import {setOrigin, setDestinations, setPages, setSchedule, setCarrierCodesInSearchResult} from "../../store/actions";
import airports from "../../flightapi/airports";
import holidays from "../../flightapi/holidays";

import getFlightWeather from '../../weather/FlightWeather';

class ScheduledFlightSearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.scheduleSelected = this.scheduleSelected.bind(this);
        this.getScheduledFlights = this.getScheduledFlights.bind(this);
        this.bucket = this.bucket.bind(this);
    }

    scheduleSelected(e, schedule) {
        this.props.onPagesSubmit({
            pages: [this.props.navigation.pages[0], this.props.navigation.pages[1],
                {page: <ScheduledFlightDetailPanel/>, breadcrumb: 'Detail'}]
        });
        this.props.onScheduleSubmit({schedule});
        e.preventDefault();
    }

    bucket(d, buckets) {
        buckets.sort((a,b) => a.threshold > b.threshold ).reverse();
        return buckets.reduce( (a,v) =>  {
            return d < v.threshold ? v : a
        }).value;
    }


    getScheduledFlights(props) {
        let _c = this;
        const carrierCodesInSearchResult = {}
        if (props.data && props.data.scheduledOrigin) {
            let f = new FlightAware();
            f.setCredentials(passwd.flightAwareApiUser, passwd.flightAwareApiKey);
            f.AllScheduled({airport: props.data.scheduledOrigin.label, filter: 'airline'}, (err, r) => {
                if (err) {
                    console.log(`ScheduledFlightSearchResults: FLight API ERROR: '${JSON.stringify(err, null, 2)}'`);
                }
                else {
                    let filtered = r.scheduled.filter(d => airports[d.destination.substring(1)]).map(d => {
                        carrierCodesInSearchResult[d.ident.replace(/\d+/, '')] = true
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
                            if(n.originWeather && n.destinationWeather) {
                                let inputData = {
                                    crs_dep_time_bucket: _c.bucket(parseInt(n.departuretime.match(/(\d.*?):/), 10),
                                        [
                                            {threshold: 6, value: 'N'},
                                            {threshold: 12, value: 'M'},
                                            {threshold: 18, value: 'A'},
                                            {threshold: 24, value: 'E'}
                                        ]),
                                    dest_precipitation_3h: (n.destinationWeather.rain ?
                                        n.destinationWeather.rain['rain.3h'] || 0 : 0) + (n.destinationWeather.snow ?
                                        n.destinationWeather.snow['snow.3h'] || 0 : 0),
                                    duration_bucket: _c.bucket(n.estimatedarrivaltime - n.filed_departuretime,
                                        [
                                            {threshold: 1*60*60, value: 'XS'},
                                            {threshold: 2*60*60, value: 'S'},
                                            {threshold: 5*60*60, value: 'M'},
                                            {threshold: 8*60*60, value: 'L'},
                                            {threshold: 10*60*60, value: 'XL'},
                                            {threshold: 40*60*60, value: 'XXL'}
                                        ]),
                                    crs_arr_time_bucket: _c.bucket(parseInt(n.arrivaltime.match(/(\d.*?):/), 10),
                                        [
                                            {threshold: 6, value: 'N'},
                                            {threshold: 12, value: 'M'},
                                            {threshold: 18, value: 'A'},
                                            {threshold: 24, value: 'E'}
                                        ]),
                                    dest_pressure: n.destinationWeather.main.sea_level,
                                    dest_air_temp: n.destinationWeather.main.temp,
                                    dest_wind_speed: n.destinationWeather.wind.speed,
                                    dest_wind_dir: n.destinationWeather.wind.deg,
                                    origin_precipitation_3h: (n.originWeather.rain ?
                                        n.originWeather.rain['rain.3h'] || 0 : 0) + (n.originWeather.snow ?
                                        n.originWeather.snow['snow.3h'] || 0 : 0),
                                    origin_wind_dir: n.originWeather.wind.deg,
                                    origin_wind_speed: n.originWeather.wind.speed,
                                    origin_air_temp: n.originWeather.main.temp,
                                    origin_pressure: n.originWeather.main.sea_level,
                                    dest_size: _c.bucket(airports[n.destination],
                                        [
                                            {threshold: 50, value: 'XS'},
                                            {threshold: 100, value: 'S'},
                                            {threshold: 150, value: 'L'},
                                            {threshold: 200, value: 'XL'},
                                            {threshold: 1000, value: 'XXL'}
                                        ]),
                                    dest_state: airports[n.destination].state,
                                    dep_date_holidays: holidays[moment.unix(d.filed_departuretime).format('YYYY-MM-DD')] ?
                                        holidays[moment.unix(d.filed_departuretime).format('YYYY-MM-DD')]: '-',
                                    dest: n.destination,
                                    origin_state: airports[n.origin].state,
                                    carrier: n.ident.substring(0,3),
                                    origin: n.origin,
                                    dep_month: moment.unix(d.filed_departuretime).format('MMM').toUpperCase(),
                                    dep_day_of_week: moment.unix(d.filed_departuretime).format('ddd').toUpperCase(),
                                    arr_date_holidays: holidays[moment.unix(d.estimatedarrivaltime).format('YYYY-MM-DD')] ?
                                        holidays[moment.unix(d.estimatedarrivaltime).format('YYYY-MM-DD')]: '-',
                                    origin_size: _c.bucket(airports[n.origin],
                                        [
                                            {threshold: 50, value: 'XS'},
                                            {threshold: 100, value: 'S'},
                                            {threshold: 150, value: 'L'},
                                            {threshold: 200, value: 'XL'},
                                            {threshold: 1000, value: 'XXL'}
                                        ])
                                };
                                n.predictedDelay = Math.round(predict(inputData));
                                _c.setState({delayPredicted: Math.random()});
                            }
                        });
                        return n;
                    });
                    _c.setState({data: filtered});
                    this.props.onDestinationsSubmit({destinations: filtered});
                }
            });
        }
        this.props.setCarrierCodesInSearchResult(carrierCodesInSearchResult)
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.data.scheduledOrigin && (!this.props.data || !this.props.data.scheduledOrigin ||
                nextProps.data.scheduledOrigin !== this.props.data.scheduledOrigin)) {
            this.carrierCodesInSearchResult = {}
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
        const { carrierSearch } = this.props.data
        console.log('getScheduledFlights cs', carrierSearch)
        let data = null
        if (_c.state.data) {
            data = _c.state.data.filter(d => {
                if (carrierSearch) {
                    return d.ident.startsWith(carrierSearch.codeLabel)
                }
                return true
            })
        }
        console.log('data', data)

        return (<Container fluid={true} className="selected-results">
            <Row>
            <Col xs={12} className="select-title">RESULT</Col>
                <Col xs={12}>
                    {this.props.data.scheduledOrigin && data && <ReactTable
                        data={data}
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
                                accessor: "predictedDelay",
                                Cell: row => (<span className="predictedDelay">{parseInt(row.value) || 0} m</span>),
                                defaultSortDesc: true
                            }

                        ]}
                        defaultSorted={[
                            {
                              id: "predictedDelay",
                              desc: true
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
    onPagesSubmit: setPages,
    setCarrierCodesInSearchResult
};


function mapStateToProps(state) {
    return {
        data: state.data,
        navigation: state.navigation
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduledFlightSearchResults);