import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {CatalogHelper} from '@gooddata/react-components';
import {Execute} from '@gooddata/react-components';
import {connect} from 'react-redux';


import FlightDetailPanel from '../FlightDetailPanel/FlightDetailPanel';
import catalogJson from '../../catalog';
import cfg from '../../config';
import { setFlight, setPages } from "../../store/actions";
import OriginToDestinationScatterPlot from '../FlightDetailPanel/OriginToDestinationScatterPlot'

const C = new CatalogHelper(catalogJson);


class FlightSearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.flightSelected = this.flightSelected.bind(this);
    }

    getResultsAfm(origin, destination, carrier = null) {
        let afm = {
            attributes: [
                {
                    id: C.attributeDisplayForm('Carrier'),
                    type: 'attribute'
                },
                {
                    id: C.attributeDisplayForm('Flight Number'),
                    type: 'attribute'
                },
                {
                    id: C.attributeDisplayForm('Carrier Name'),
                    type: 'attribute'
                }
            ],
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
                    id: C.attributeDisplayForm('Origin IATA Code'),
                    type: 'attribute',
                    in: [origin]
                },
                {
                    id: C.attributeDisplayForm('Destination IATA Code'),
                    type: 'attribute',
                    in: [destination]
                }
            ]
        }
        
        if(carrier) {
            const carrierFilter = {
                    id: C.attributeDisplayForm('Carrier Name'),
                    type: 'attribute',
                    in: [carrier]
            }
            
            afm.filters.push(carrierFilter);
        }
        
        console.log(afm);
        console.log(carrier);
        return (afm);
    }

    flightSelected(e, carrier, flight) {
        this.props.onPagesSubmit({pages:[this.props.navigation.pages[0], this.props.navigation.pages[1],
                {page: <FlightDetailPanel/>, breadcrumb: 'Detail'}]});
        this.props.onFlightSubmit({ carrier }, { flight });
        if (e) { 
            e.preventDefault();
        }
    }

    scatterOnPointClick(point) {
        const displayForms = [ C.attributeDisplayForm('Carrier'), C.attributeDisplayForm('Flight Number'), C.attributeDisplayForm('Carrier Name') ]
        const f = displayForms.map(df => point[df]);
        return this.flightSelected(null, f[0], f[1])
    }

    render() {
        let _c = this;
        const {origin, destination, carrier} = this.props.data
        const optionalCarrier = (!this.props.data.carrier) ? null : this.props.data.carrier.value;

        return (
            <div>
                <Execute afm={this.getResultsAfm(this.props.data.origin.value, this.props.data.destination.value, optionalCarrier)} projectId={cfg.projectId}
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
                            console.log('flights from A to B - executionResult', executionResult)
                            let data = executionResult.result.rawData.map((row) => {
                                return {
                                    flightNum: <a href="" onClick={(e) => _c.flightSelected(e, row[0], row[1])}>{row[1].name}</a>,
                                    carrier: row[2].name,
                                    ontime: row[3] ? `${Math.round(parseInt(row[3]*100, 10))}%` : '-',
                                    delayed: row[4] ? `${Math.round(parseInt(row[4]*100, 10))}%` : '-',
                                    cancelled: row[5] ? `${Math.round(parseInt(row[5]*100, 10))}%` : '-',
                                    diverted: row[6] ? `${Math.round(parseInt(row[6]*100, 10))}%` : '-',
                                }
                            });
                            return (
                                <div>
                                <Row className="selected-results">
                                    {/*<Col xs={12} className="select-title">RESULT</Col>*/}
                                    <Col xs={12}>
                                        <ReactTable
                                            data={data}
                                            columns={[
                                                {
                                                    Header: "Flight #",
                                                    accessor: "flightNum",
                                                    minWidth: 80
                                                },
                                                {
                                                    Header: "Carrier",
                                                    accessor: "carrier",
                                                    minWidth: 150
                                                },
                                                {
                                                    Header: "On Time",
                                                    accessor: "ontime",
                                                    minWidth: 80
                                                },
                                                {
                                                    Header: "Delayed",
                                                    accessor: "delayed",
                                                    minWidth: 80
                                                },
                                                {
                                                    Header: "Cancelled",
                                                    accessor: "cancelled"
                                                },
                                                {
                                                    Header: "Diverted",
                                                    accessor: "diverted"
                                                }
                                            ]}
                                            defaultPageSize={5}
                                            showPageSizeOptions={false}
                                        />
                                    </Col>
                                </Row>
                                <Row className="selected-results-plot-row">
                                        <Col xs={12}>
                                            <div className="selected-results-plot">
                                            <OriginToDestinationScatterPlot originId={origin && origin.value}
                                                                            destinationId={destination && destination.value}
                                                                            onPointClick={_c.scatterOnPointClick.bind(_c)} />
                                            </div>
                                        </Col>
                                </Row>
                                </div>
                            );
                        }
                    }
                </Execute>
                <Row>
                        <Col xs={12}>&nbsp;</Col>
                        <Col xs={12}><h3>{false ? "No flights found ..." : ''}</h3></Col>
                </Row>
            </div>

        );
    }

}

const mapDispatchToProps = {
    onFlightSubmit: setFlight,
    onPagesSubmit: setPages
}


function mapStateToProps(state) {
    return {
        data: state.data,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightSearchResults);