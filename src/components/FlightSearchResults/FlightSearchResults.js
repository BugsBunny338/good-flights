import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {CatalogHelper} from '@gooddata/react-components';
import {Execute} from '@gooddata/react-components';
import {connect} from 'react-redux';


import FlightDetailPanel from '../FlightDetailPanel/FlightDetailPanel';

import catalogJson from '../../catalog.json';
import cfg from '../../config';
import { setFlight, setPages } from "../../store/actions";

const C = new CatalogHelper(catalogJson);


class FlightSearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.flightSelected = this.flightSelected.bind(this);
    }

    getResultsAfm(origin, destination) {
        return ({
            attributes: [
                {
                    id: C.attributeDisplayForm('Carrier'),
                    type: 'attribute'
                },
                {
                    id: C.attributeDisplayForm('Flight Number'),
                    type: 'attribute'
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
        });
    }

    flightSelected(e, flight) {
        this.props.onPagesSubmit({pages:[this.props.navigation.pages[0], this.props.navigation.pages[1],
                {page: <FlightDetailPanel/>, breadcrumb: 'Detail'}]});
        this.props.onFlightSubmit({ flight: flight });
        e.preventDefault();
    }

    render() {
        let _c = this;
        return (
            <div>
                <Execute afm={this.getResultsAfm(this.props.data.origin.value, this.props.data.destination.value)} projectId={cfg.projectId}
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
                                return {flightNum: <a href="" onClick={(e) => _c.flightSelected(e, row[1])}>{row[0].name}{row[1].name}</a>}
                            });
                            return (
                                <Row>
                                    <Col xs={12}>
                                        <ReactTable
                                            data={data}
                                            columns={[
                                                {
                                                    Header: "Flight #",
                                                    accessor: "flightNum"
                                                }
                                            ]}
                                            defaultPageSize={10}
                                            showPageSizeOptions={false}
                                            className="-striped -highlight"
                                        />
                                    </Col>
                                </Row>
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