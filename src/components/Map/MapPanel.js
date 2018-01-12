import React, {Component} from 'react';
import {Container, Row, Col, Label} from 'reactstrap';
import {connect} from "react-redux";
import {Execute} from '@gooddata/react-components';

import Map from './Map';
import { CatalogHelper } from '@gooddata/react-components';
import catalogJson from '../../catalog.json';
import cfg from '../../config';

const C = new CatalogHelper(catalogJson);

class MapPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.generateMapAfm = this.generateMapAfm.bind(this);
    }

    generateMapAfm() {
        return {
            attributes: [
                {
                    id: C.attributeDisplayForm('Origin IATA Code'),
                    type: 'attribute'
                },
                {
                    id: C.attributeDisplayForm('Origin GPS Latitude'),
                    type: 'attribute'
                },
                {
                    id: C.attributeDisplayForm('Origin GPS Longitude'),
                    type: 'attribute'
                },
                {
                    id: C.attributeDisplayForm('Destination IATA Code'),
                    type: 'attribute'
                },
                {
                    id: C.attributeDisplayForm('Destination GPS Latitude'),
                    type: 'attribute'
                },
                {
                    id: C.attributeDisplayForm('Destination GPS Longitude'),
                    type: 'attribute'
                }
            ],
            filters: [
                {
                    id: C.attributeDisplayForm('Origin IATA Code'),
                    type: 'attribute',
                    in: [this.props.data.origin ? this.props.data.origin.value : undefined]
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
            ],
        };
    }


    render() {
        let _c= this;
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs={12}>
                        {this.props.data.origin && <Execute afm={this.generateMapAfm()} projectId={cfg.projectId} onLoadingChanged={e=>{}} onError={e=>{}}>
                            {
                                (executionResult) => {

                                    return (
                                        <Container fluid={true}>
                                            <Row>
                                                <Col xs={12}>
                                                    <Map
                                                        flights={
                                                            executionResult.result.rawData.map(function(flight, index) {
                                                                const singleRoute = {
                                                                    flightId: flight[0].name+flight[3].name,
                                                                    originIata: flight[0].name,
                                                                    originLat: parseFloat(flight[1].name),
                                                                    originLng: parseFloat(flight[2].name),
                                                                    destIata: flight[3].name,
                                                                    destLat: parseFloat(flight[4].name),
                                                                    destLng: parseFloat(flight[5].name),
                                                                    numOfFlights: parseFloat(flight[6])
                                                                }

                                                                return singleRoute;
                                                            })
                                                        }

                                                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4Vo7Rv1C80cQ05W2w8qjMAlA5IBpiufE&v=3.exp&libraries=geometry,drawing,places"
                                                        loadingElement={<div className="MapLoadingElement" style={{ height: 350,
                                                            width: '100%',
                                                            display: 'flex',
                                                            flexFlow: 'row nowrap',
                                                            justifyContent: 'center',
                                                            padding: 0 }}/>}
                                                        containerElement={<div className="MapContainerElement" style={{
                                                            width: "100%",
                                                            marginLeft: 0
                                                        }}/>}
                                                        mapElement={<div className="MapElement" />}
                                                    />
                                                </Col>
                                            </Row>
                                        </Container>

                                    );
                                }
                            }
                        </Execute>}
                    </Col>
                </Row>
            </Container>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {};
}


function mapStateToProps(state) {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPanel);