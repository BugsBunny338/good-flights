import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {connect} from "react-redux";
import {Execute} from '@gooddata/react-components';

import Map from '../Map/Map';
import {CatalogHelper} from '@gooddata/react-components';
import catalogJson from '../../catalog.json';
import cfg from '../../config';

const C = new CatalogHelper(catalogJson);

class MapPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.generateMapAfm = this.generateMapAfm.bind(this);
        this.getFilters = this.getFilters.bind(this);
    }

    generateMapAfm() {
        let ret = {
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
                },
                {
                    id: C.attributeDisplayForm('Carrier Name'),
                    type: 'attribute'
                }
            ],
            filters: this.getFilters(),
            measures: [
                {
                    id: 'flight_quality_score',
                    definition: {
                        baseObject: {
                            id: C.metric('Flight Quality Score')
                        }
                    }
                }
            ]
        };
        return ret;
    }

    // if origin is provided,
    // show all flights from origin, if destination is also provided, show all flights between origin
    // and destination
    getFilters() {
        if (this.props.data.origin) {
            let filters = [
                {
                    id: C.attributeDisplayForm('Origin IATA Code'),
                    type: 'attribute',
                    in: [this.props.data.origin.value]
                }
            ];
            if (this.props.data.destination) {
                filters.push({
                    id: C.attributeDisplayForm('Destination IATA Code'),
                    type: 'attribute',
                    in: [this.props.data.destination.value]
                });
            }
            return filters;
        }
        return [];
    }

    render() {
        const {origin, destination} = this.props.data
        return (
            <div>
                {this.props.data.origin &&
                <Execute afm={this.generateMapAfm()} projectId={cfg.projectId} onLoadingChanged={e => {
                }} onError={e => {
                }}>
                    {

                        (executionResult) => {
                            let routes = executionResult.result.rawData.map(function (flight, index) {
                                return {
                                    flightId: flight[0].name + flight[3].name + Math.random(),
                                    originIata: flight[0].name,
                                    originLat: parseFloat(flight[1].name),
                                    originLng: parseFloat(flight[2].name),
                                    destIata: flight[3].name,
                                    destLat: parseFloat(flight[4].name),
                                    destLng: parseFloat(flight[5].name),
                                    carrier: flight[6].name,
                                    flightQuality: parseFloat(flight[7])
                                }
                            });

                            return (
                                <Container fluid={true} className="map-result">
                                    <Row>
                                        <Col xs={12}>
                                            <Map
                                                flights={routes}

                                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4Vo7Rv1C80cQ05W2w8qjMAlA5IBpiufE&v=3.exp&libraries=geometry,drawing,places"
                                                loadingElement={<div className="MapLoadingElement" style={{
                                                    height: 350,
                                                    width: '100%',
                                                    display: 'flex',
                                                    flexFlow: 'row nowrap',
                                                    justifyContent: 'center',
                                                    padding: 0
                                                }}/>}
                                                containerElement={<div className="MapContainerElement" style={{
                                                    width: "100%",
                                                    marginLeft: 0
                                                }}/>}
                                                mapElement={<div className="MapElement"/>}
                                            />
                                        </Col>
                                    </Row>
                                </Container>

                            );
                        }
                    }
                </Execute>}
            </div>
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