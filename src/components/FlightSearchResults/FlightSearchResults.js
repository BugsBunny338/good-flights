import React, {Component} from 'react';
import {Container, Row, Col, Label} from 'reactstrap';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {CatalogHelper} from '@gooddata/react-components';
import {Execute} from '@gooddata/react-components';
import {connect} from 'react-redux';

import catalogJson from '../../catalog.json';
import cfg from '../../config';
import actions from "../../store/actions";

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
            ],
            measures: [
                {
                    id: 'number_of_flights',
                    definition: {
                        baseObject: {
                            id: C.metric('Number of Flights [Sum]')
                        }
                    }
                }
            ]
        });
    }

    flightSelected(flight) {
        this.props.onFlightSubmit({ flight: flight });
    }

    render() {
        let _c = this;
        return (
            <Container fluid={true}>
                <Execute afm={this.getResultsAfm(this.props.data.origin.value, this.props.data.destination.value)} projectId={cfg.projectId}
                         onLoadingChanged={e => <h1>NO FLIGHTS</h1>} onError={e => <h1>ERROR</h1>}>
                    {
                        (executionResult) => {
                            let data = executionResult.result.rawData.map((row) => {
                                return {flightNum: <div onClick={(d) => _c.flightSelected(row[1])}>{row[0].name}{row[1].name}</div>}
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
                                            className="-striped -highlight"
                                        />
                                    </Col>
                                </Row>
                            );
                        }
                    }
                </Execute>
            </Container>

        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        onFlightSubmit: (state) => {
            dispatch({type: actions.SET_FLIGHT, flight: state.flight})
        }
    }
}


function mapStateToProps(state) {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightSearchResults);