import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import {connect} from "react-redux";
import Select from 'react-select';
import {Execute} from '@gooddata/react-components';

import cfg from '../../config';
import catalogJson from '../../catalog';
import PixelPerfectChart from '../PixelPerfectChart/PixelPerfectChart';
import {CatalogHelper} from "@gooddata/react-components/dist/index";
import {setReport} from "../../store/actions";

const C = new CatalogHelper(catalogJson);

class FlightDetailPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {report: {value: 1894, label: 'On Time Benchmark'}};
        this.afm = this.afm.bind(this);
        this.changeReport = this.changeReport.bind(this);

    }

    afm(carrier, flight) {
        carrier = {...carrier, label: carrier.name};
        flight = {...flight, label: flight.name};
        return ({
            measures: [
                {
                    id: 'ontime_pct',
                    definition: {
                        baseObject: {
                            id: C.metric('% On Time Flights')
                        }
                    }
                },
                {
                    id: 'delayed_pct',
                    definition: {
                        baseObject: {
                            id: C.metric('% Delayed Flights')
                        }
                    }
                },
                {
                    id: 'sig_delayed_pct',
                    definition: {
                        baseObject: {
                            id: C.metric('Delayed Flights (15min+)')
                        }
                    }
                },
                {
                    id: 'cancelled_pct',
                    definition: {
                        baseObject: {
                            id: C.metric('% Cancelled Flights')
                        }
                    }
                },
                {
                    id: 'diverted_pct',
                    definition: {
                        baseObject: {
                            id: C.metric('% Diverted Flights')
                        }
                    }
                }
            ],
            filters: [
                {
                    id: 'label.flights.carrier',
                    type: 'attribute',
                    in: [carrier.id]
                },
                {
                    id: 'label.flights.flightnumber',
                    type: 'attribute',
                    in: [flight.id]
                }
            ]
        });
    };

    changeReport(report) {
        this.props.onReportSubmit({report: report});
    }

    render() {
        let {origin, destination, flight, carrier, report} = this.props.data;
        if(!report) report = {value: 1894, label: 'On Time Benchmark'};
        const options = [
            {value: 1894, label: 'On Time Benchmark'},
            {value: 1848, label: 'Cancelled Benchmark'},
            {value: 1905, label: 'Diverted Benchmark'},
            {value: 1914, label: 'Delayed Benchmark'},
            {value: 1920, label: 'Delayed (15+) Benchmark'}
        ];
        return (
            <div className="FlightDetailPanel">
                <Row>
                    <Col xs={12}>
                        <h1 className="FlightDetailPanel-h1">Flight {carrier.name}{flight.name} from {origin.label} to {destination.label} Benchmark</h1>
                    </Col>
                </Row>
                <Execute afm={this.afm(carrier, flight)} projectId={cfg.projectId}
                         onLoadingChanged={
                             e => {
                                 //TODO HOW TO SHOW A "NO FLIGHTS" MESSAGE?
                                 console.log('No flights');
                                 return new Error('No flights');
                             }
                         }
                         onError={
                             e => {
                                 console.log(`FlightSearchResults: Error retrieving flights: ${JSON.stringify(e)} .`);
                                 return new Error(`FlightSearchResults: Error retrieving flights: ${JSON.stringify(e)} .`);
                             }
                         }>
                    {
                        (executionResult) => {
                            let data = executionResult.result.rawData.map((row) => {
                                return {
                                    ontime: row[0] ? `${Math.round(parseFloat(row[0] * 10000, 10)) / 100}%` : '-',
                                    delayed: row[1] ? `${Math.round(parseFloat(row[1] * 10000, 10)) / 100}%` : '-',
                                    delayed_15: row[2] ? `${Math.round(parseFloat(row[2] * 10000, 10)) / 100}%` : '-',
                                    cancelled: row[3] ? `${Math.round(parseFloat(row[3] * 10000, 10)) / 100}%` : '-',
                                    diverted: row[4] ? `${Math.round(parseFloat(row[4] * 10000, 10)) / 100}%` : '0%',
                                }
                            });
                            return (
                                <div>
                                    <Row>
                                        <Col xs={3}>
                                            <h1 className="FlightDetailPanel-h1">{data[0].ontime}</h1>
                                            <p>On Time</p>
                                        </Col>
                                        <Col xs={3}>
                                            <h1 className="FlightDetailPanel-h1">{data[0].delayed}</h1>
                                            <p>Delayed</p>
                                        </Col>
                                        <Col xs={3}>
                                            <h1 className="FlightDetailPanel-h1">{data[0].cancelled}</h1>
                                            <p>Cancelled</p>
                                        </Col>
                                        <Col xs={3}>
                                            <h1 className="FlightDetailPanel-h1">{data[0].diverted}</h1>
                                            <p>Diverted</p>
                                        </Col>
                                    </Row>
                                </div>
                            );
                        }
                    }
                </Execute>
                <Row className="search-column">
                    <Col xs={8}/>
                    <Col className="search-menu" xs={4}>
                        <Select id="origin" style={{margin: '5px'}}
                                value={report}
                                options={options}
                                placeholder="Report"
                                onChange={this.changeReport}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <PixelPerfectChart height="600px" src={
                            "https://secure.gooddata.com/reportWidget.html" +
                            `?label.origins.originiatacode=${origin.label}` +
                            `&label.destinations.destinationiatacode=${destination.label}` +
                            `&label.flights.flightnumber=${flight.name}` +
                            `&label.flights.carrier=${carrier.name}` +
                            `#project=/gdc/projects/${cfg.projectId}` +
                            `&report=/gdc/md/${cfg.projectId}/obj/${report.value}` +
                            "&transparentBackground=yes"} report={report}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapDispatchToProps = {
    onReportSubmit: setReport
}


function mapStateToProps(state) {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightDetailPanel);